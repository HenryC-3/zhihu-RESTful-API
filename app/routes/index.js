const fs = require("fs");

/**
 * @description 批量注册 routes 目录下的 koa-router 实例
 * @param {object} app 接收 koa 实例
 */
module.exports = (app) => {
	fs.readdirSync(__dirname).forEach((file) => {
		if (file === "index.js") return;
		const router = require(`./${file}`);
		app.use(router.routes()).use(router.allowedMethods());
	});
};
