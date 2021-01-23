const Koa = require("koa");
const Router = require("koa-router");
const KoaBody = require("koa-body"); // Koa 本身并不支持解析 request.body
const app = new Koa();
const router = new Router();

// 使用 prefix 精简写法
const userRouter = new Router({
	prefix: "/users",
});

// 模拟数据库
const db = [{ name: "Jack" }, { name: "Jhon" }];

// 模拟获取用户列表
userRouter.get("/", (ctx) => {
	ctx.body = db;
});

// 模拟新建用户
userRouter.post("/", (ctx) => {
	db.push(JSON.parse(ctx.request.body));
	ctx.body = `新建用户${ctx.request.body}`;
});

// 模拟查找特定用户
userRouter.get("/:id", (ctx) => {
	ctx.body = db[ctx.params.id * 1];
});

// 模拟修改用户
userRouter.put("/:id", (ctx) => {
	let prevData = JSON.stringify(db[ctx.params.id * 1]);
	db[ctx.params.id * 1] = JSON.parse(ctx.request.body);
	ctx.body = `修改 ${prevData} 为 ${ctx.request.body}`;
});

// 模拟删除用户
// 204 no content 请求已成功, 只是没有内容
userRouter.delete("/:id", (ctx) => {
	db.splice(ctx.params.id * 1, 1);
	ctx.status = 204;
});

// 注意中间件的调用顺序
app.use(KoaBody());
app.use(userRouter.routes()).use(router.allowedMethods());

app.listen(3000);
