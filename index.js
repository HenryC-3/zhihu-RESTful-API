const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

// 使用 prefix 精简写法
const userRouter = new Router({
	prefix: "/users",
});

// 处理不同的 URL
userRouter.get("/", (ctx) => {
	ctx.body = "users";
});

// 解析 URL 上的参数
userRouter.get("/:id", (ctx) => {
	ctx.body = ctx.params.id;
});

// 处理不同的 HTTP 方法
router.get("/", (ctx) => {
	ctx.body = "get";
});
router.post("/", (ctx) => {
	ctx.body = "post";
});

app.use(router.routes()).use(router.allowedMethods());
app.use(userRouter.routes()).use(router.allowedMethods());

app.listen(3000);
