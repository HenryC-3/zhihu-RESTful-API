const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
	if (ctx.url === "/hello") {
		// 处理不同的 URL
		ctx.body = "hello world";
	} else if (ctx.url.match(/\/users/)) {
		// 解析 URL 上的参数
		ctx.body = "users";
	} else if (ctx.method === "GET") {
		// 处理不同的 HTTP 方法
		ctx.body = "get";
	} else if (ctx.method === "POST") {
		ctx.body = "post";
	} else {
		ctx.status = 404;
	}
});

app.listen(3000);
