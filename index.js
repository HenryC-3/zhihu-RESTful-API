const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

// 使用 prefix 精简写法
const userRouter = new Router({
	prefix: "/users",
});

// 模拟获取用户列表
userRouter.get("/", (ctx) => {
	ctx.body = [{ name: "Jack" }, { name: "Jhon" }];
});

// 模拟新建用户
userRouter.post("/", (ctx) => {
	ctx.body = { name: "Jeremy" };
});

// 模拟查找特定用户
userRouter.get("/:id", (ctx) => {
	ctx.body = { name: "Jack" };
});

// 模拟修改用户
userRouter.put("/:id", (ctx) => {
	ctx.body = { name: "Jack2" };
});

// 204 no content 请求已成功,只是没有内容
userRouter.delete("/:id", (ctx) => {
	ctx.status = 204;
});

app.use(userRouter.routes()).use(router.allowedMethods());

app.listen(3000);
