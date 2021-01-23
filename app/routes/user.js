const Router = require("koa-router");
const { find, create, findByID, update, del } = require("../controllers/user");
const router = new Router({
	prefix: "/users",
});

// 模拟获取用户列表
router.get("/", (ctx) => {
	find(ctx);
});

// 模拟新建用户
router.post("/", (ctx) => {
	create(ctx);
});

// 模拟查找特定用户
router.get("/:id", (ctx) => {
	findByID(ctx);
});

// 模拟修改用户
router.put("/:id", (ctx) => {
	update(ctx);
});

// 模拟删除用户
// 204 no content 请求已成功, 只是没有内容
router.delete("/:id", (ctx) => {
	del(ctx);
});

module.exports = router;
