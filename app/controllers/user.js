const User = require("../models/user");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
class userController {
	async checkUser(ctx, next) {
		// NOTE token 中的 id 必须与 URL 中的 id 相同, 确保登陆用户只能修改自身信息
		if (ctx.state.user._id !== ctx.params.id) {
			ctx.throw(403, "没有权限");
		}
		await next();
	}
	async find(ctx) {
		ctx.body = await User.find();
	}
	async create(ctx) {
		// NOTE 创建用户时, 必须有用户名和密码
		ctx.verifyParams({
			name: { type: "string", required: true },
			password: { type: "string", required: true },
		});

		// NOTE 假设不能出现相同用户名, 通过查询用户名验证用户是否存在
		if (await User.findOne(ctx.request.body)) {
			ctx.throw(409, "用户已存在");
		}
		ctx.body = await new User(ctx.request.body).save();
	}
	async findByID(ctx) {
		// NOTE url 格式 http://localhost:3000/users/60116cdb2bde543ca7350c2b?fields=locations;business
		const { fields } = ctx.query;

		// NOTE 处理获得的 url 参数, 使其满足 select 语法 https://mongoosejs.com/docs/api.html#query_Query-select
		const seletedFields = fields
			.split(";")
			.filter((f) => f) //过滤空参数
			.map((f) => " +" + f)
			.join(" ");

		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			// 在响应体中额外显示 selectedFields 中指定的 field, select 语法详见 https://mongoosejs.com/docs/api.html#query_Query-select
			ctx.body = await User.findById(ctx.params.id).select(seletedFields);
		}
	}
	async update(ctx) {
		ctx.verifyParams({
			name: { type: "string", required: false },
			password: { type: "string", required: false },
			avatar_url: { type: "string", required: false },
			gender: { type: "string", required: false },
			headline: { type: "string", required: false },
			locations: { type: "array", itemType: "string", required: false },
			business: { type: "string", required: false },
			employments: { type: "array", itemType: "object", required: false },
			enducation: { type: "string", itemType: "object", required: false },
		});
		// NOTE 判断 id 是否有效 https://stackoverflow.com/a/25798043
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			const user = await User.findByIdAndUpdate(
				ctx.params.id,
				ctx.request.body
			);
			// NOTE koa 未设置 ctx.body 或 ctx.throw 时,默认响应为 404 https://github.com/koajs/koa/issues/905#issuecomment-280997965
			ctx.body = user;
		}
	}
	async del(ctx) {
		// NOTE 判断 id 是否有效
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			await User.findByIdAndDelete(ctx.params.id);
			ctx.throw(204);
		}
	}
	async login(ctx) {
		ctx.verifyParams({
			name: { type: "string", required: true },
			password: { type: "string", required: true },
		});

		const user = await User.findOne(ctx.request.body);
		if (!user) {
			ctx.throw(401, "用户名或密码错误");
		}
		const { _id, name } = user;
		const token = jsonwebtoken.sign({ _id, name }, process.env.SECRET, {
			expiresIn: "1d",
		});
		ctx.body = { token };
	}
	async upload(ctx) {
		const file = ctx.request.files;
		const basename = path.basename(Object.values(file)[0].path);
		ctx.body = { path: `${ctx.origin}/uploads/${basename}` };
	}

	async listFollowing(ctx) {
		const user = await User.findById(ctx.params.id)
			.select("following")
			.populate("following");
		if (!user) {
			ctx.throw(404);
		}
		ctx.body = user.following;
	}

	async follow(ctx) {
		const me = await User.findById(ctx.state.user._id).select("+following");
		if (!me.following.map((id) => id.toString).includes(ctx.params.id)) {
			me.following.push(ctx.params.id);
			me.save();
		}
		ctx.status = 204;
	}
}

module.exports = new userController();
