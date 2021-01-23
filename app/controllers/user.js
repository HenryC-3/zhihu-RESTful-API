// 模拟数据库
const db = [{ name: "Jack" }, { name: "Jhon" }];

class userController {
	find(ctx) {
		ctx.body = db;
	}
	create(ctx) {
		db.push(JSON.parse(ctx.request.body));
		ctx.body = `新建用户${ctx.request.body}`;
	}
	findByID(ctx) {
		ctx.body = db[ctx.params.id * 1];
	}
	update(ctx) {
		let prevData = JSON.stringify(db[ctx.params.id * 1]);
		db[ctx.params.id * 1] = ctx.request.body;
		ctx.body = `修改 ${prevData} 为 ${JSON.stringify(ctx.request.body)}`;
	}
	del(ctx) {
		db.splice(ctx.params.id * 1, 1);
		ctx.status = 204;
	}
}

module.exports = new userController();