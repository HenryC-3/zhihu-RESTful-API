const Koa = require("koa");
const KoaBody = require("koa-body"); // Koa 本身并不支持解析 request.body
const app = new Koa();
const route = require("./app/routes");

// 注意中间件的调用顺序
// 错误处理
app.use(async (ctx, next) => {
	try {
		await next();
		// d.b; // 模拟运行时错误
	} catch (err) {
		ctx.status = err.status || err.statusCode || 500;
		ctx.body = {
			message: err.message,
		};
	}
});
app.use(KoaBody());
route(app);

app.listen(3000);
