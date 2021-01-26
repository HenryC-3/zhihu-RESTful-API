const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
	__v: { type: Number, select: false },
	name: { type: String, required: true },
	// 通常 MongoDB 会返回 document 中所有的 field, 这里不需要返回 password field
	// 可借助 mongoose schema type 中的 select 选项实现 https://mongoosejs.com/docs/schematypes.html
	password: { type: String, required: true, select: false },
});

module.exports = model("User", userSchema);
