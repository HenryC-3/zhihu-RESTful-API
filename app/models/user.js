const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
	__v: { type: Number, select: false },
	name: { type: String, required: true },

	// NOTE select:false 用于不在响应体中不显示该 field https://mongoosejs.com/docs/schematypes.html
	password: { type: String, required: true, select: false },
	avatar_url: { type: String },
	gender: {
		type: String,
		required: true,
		enum: ["male", "female"], // NOTE enum 用于校验字符 [Mongoose v5.11.14: Validation](https://mongoosejs.com/docs/validation.html)
		default: "male",
	},
	headline: { type: String },
	locations: { type: [{ type: String }] },
	business: { type: String, select: false },
	employments: {
		type: [
			{
				company: { type: String },
				job: { type: String },
			},
		],
		select: false,
	},
	educations: {
		type: [
			{
				school: { type: String },
				major: { type: String },
				diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
				entrance_year: { type: Number },
				graduation_year: { type: Number },
			},
		],
		select: false,
	},
	following: {
		// VIEW [mongoose开发详解 - 拍岸的博客 | Paian's Blog](https://mobilesite.github.io/2017/05/07/how-to-use-mongoose/)
		// NOTE ref 引用了 User document, 后续可以通过 ObjectId 查询 User 中对应 Id 用户的其他数据
		type: [{ type: Schema.Types.ObjectId, ref: "User" }],
		select: false,
	},
});

module.exports = model("User", userSchema);
