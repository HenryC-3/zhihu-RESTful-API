const User = require("../models/user");
const mongoose = require("mongoose");

/**
 * @category Controller
 */
class userController {
	/**
	 * 查找所有用户
	 * @async
	 * @param {object} ctx koa context
	 */
	async find(ctx) {
		ctx.body = await User.find();
	}
	/**
	 * 创建用户
	 * @async
	 * @param {object} ctx koa context
	 */
	async create(ctx) {
		ctx.verifyParams({ name: { type: "string", required: true } });
		ctx.body = await new User(ctx.request.body).save();
	}
	/**
	 * 查找指定 ID 用户
	 * @async
	 * @param {object} ctx koa context
	 */
	async findByID(ctx) {
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			ctx.body = await User.findById(ctx.params.id);
		}
	}
	/**
	 * 修改用户
	 * @async
	 * @param {object} ctx koa context
	 */
	async update(ctx) {
		// 判断 id 是否有效 https://stackoverflow.com/a/25798043
		if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
			ctx.throw(404, "用户不存在");
		} else {
			/**
			 * @type {object}
			 * @description koa 未设置 ctx.body 或 ctx.throw 时,默认响应为 404
			 * @see https://github.com/koajs/koa/issues/905#issuecomment-280997965
			 */
			const user = await User.findByIdAndUpdate(
				ctx.params.id,
				ctx.request.body
			);
			ctx.body = user;
		}
	}
	/**
	 * 删除指定 ID 用户
	 * @async
	 * @param {object} ctx koa context
	 */
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
