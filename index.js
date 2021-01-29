const Koa = require("koa");
const KoaBody = require("koa-body"); // Koa 本身并不支持解析 request.body
const error = require("koa-json-error");
const app = new Koa();
const route = require("./app/routes");
require("dotenv").config();
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const path = require("path");
const KoaStatic = require("koa-static");

mongoose.connect(process.env.CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("已连接至 MongoDB Atlas");
});

// 注意中间件的调用顺序

// koa 本身不支持访问静态文件，需要借助 koa static. 如下配置表示--仅支持访问 "./app/pulic" 下的静态文件
app.use(KoaStatic(path.join(__dirname, "./app/public"))); //
app.use(
	error({
		postFormat: (error, { stack, ...rest }) =>
			process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
	})
);
app.use(
	KoaBody({
		multipart: true,
		formidable: {
			uploadDir: path.join(__dirname, "./app/public/uploads"),
			keepExtensions: true,
		},
	})
);
app.use(parameter(app));
route(app);

app.listen(3000);
