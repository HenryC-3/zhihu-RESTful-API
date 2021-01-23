const Koa = require("koa");
const KoaBody = require("koa-body"); // Koa 本身并不支持解析 request.body
const app = new Koa();
const route = require("./app/routes");

// 注意中间件的调用顺序
app.use(KoaBody());
route(app);

app.listen(3000);
