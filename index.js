const Koa = require("koa");
const KoaBody = require("koa-body"); // Koa 本身并不支持解析 request.body
const error = require("koa-json-error");
const app = new Koa();
const route = require("./app/routes");
require("dotenv").config();
const parameter = require("koa-parameter");
const mongoose = require("mongoose");
const path = require("path");

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
