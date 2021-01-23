const Router = require("koa-router");
const router = new Router({
	prefix: "/users",
});

// 模拟数据库
const db = [{ name: "Jack" }, { name: "Jhon" }];

// 模拟获取用户列表
router.get("/", (ctx) => {
	ctx.body = db;
});

// 模拟新建用户
router.post("/", (ctx) => {
	db.push(JSON.parse(ctx.request.body));
	ctx.body = `新建用户${ctx.request.body}`;
});

// 模拟查找特定用户
router.get("/:id", (ctx) => {
	ctx.body = db[ctx.params.id * 1];
});

// 模拟修改用户
router.put("/:id", (ctx) => {
	let prevData = JSON.stringify(db[ctx.params.id * 1]);
	db[ctx.params.id * 1] = JSON.parse(ctx.request.body);
	ctx.body = `修改 ${prevData} 为 ${ctx.request.body}`;
});

// 模拟删除用户
// 204 no content 请求已成功, 只是没有内容
router.delete("/:id", (ctx) => {
	db.splice(ctx.params.id * 1, 1);
	ctx.status = 204;
});

module.exports = router;
