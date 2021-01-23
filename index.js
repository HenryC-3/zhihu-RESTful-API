const Koa = require("koa");
const KoaBody = require("koa-body"); // Koa 本身并不支持解析 request.body
const error = require("koa-json-error");
const app = new Koa();
const route = require("./app/routes");
require("dotenv").config();
const parameter = require("koa-parameter");

// 注意中间件的调用顺序
app.use(
	error({
		postFormat: (error, { stack, ...rest }) =>
			process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
	})
);
app.use(KoaBody());
app.use(parameter(app));
route(app);

app.listen(3000);
