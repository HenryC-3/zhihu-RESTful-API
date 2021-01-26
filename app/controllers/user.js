const User = require("../models/user");
const mongoose = require("mongoose");
class userController {
	async find(ctx) {
		ctx.body = await User.find();
	}
	async create(ctx) {
		// 验证, 创建用户时, 必须有用户名和密码
		ctx.verifyParams({
			name: { type: "string", required: true },
			password: { type: "string", required: true },
		});

		// 假设不能出现相同用户名, 通过查询用户名验证用户是否存在
		if (User.findOne(ctx.request.body.name)) {
			ctx.throw(409, "用户已存在");
		}
		ctx.body = await new User(ctx.request.body).save();
	}
	async findByID(ctx) {
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			ctx.body = await User.findById(ctx.params.id);
		}
	}
	async update(ctx) {
		// 验证, 修改用户时, 不一定需要用户名和密码
		ctx.verifyParams({
			name: { type: "string", required: false },
			password: { type: "string", required: false },
		});
		// 判断 id 是否有效 https://stackoverflow.com/a/25798043
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			const user = await User.findByIdAndUpdate(
				ctx.params.id,
				ctx.request.body
			);
			// koa 未设置 ctx.body 或 ctx.throw 时,默认响应为 404 https://github.com/koajs/koa/issues/905#issuecomment-280997965
			ctx.body = user;
		}
	}
	async del(ctx) {
		// 判断 id 是否有效
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			await User.findByIdAndDelete(ctx.params.id);
			ctx.throw(204);
		}
	}
}

module.exports = new userController();
