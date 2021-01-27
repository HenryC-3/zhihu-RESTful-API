const jwt = require("koa-jwt");
const Router = require("koa-router");
const {
	find,
	create,
	findByID,
	update,
	del,
	login,
	checkUser,
} = require("../controllers/user");
const router = new Router({
	prefix: "/users",
});

const auth = jwt({ secret: process.env.SECRET });

// 模拟获取用户列表
router.get("/", find);

// 模拟新建用户
router.post("/", create);

// 模拟查找特定用户
router.get("/:id", findByID);

// 模拟修改用户
router.patch("/:id", auth, checkUser, update);

// 模拟删除用户
// 204 no content 请求已成功, 只是没有内容
router.delete("/:id", auth, checkUser, del);

// 模拟用户登录
router.post("/login", login);

module.exports = router;
