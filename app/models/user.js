const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
	__v: { type: Number, select: false },
	name: { type: String, required: true },

	// select:false 用于不在响应体中不显示该 field https://mongoosejs.com/docs/schematypes.html
	password: { type: String, required: true, select: false },
	avatar_url: { type: String },
	gender: {
		type: String,
		required: true,
		enum: ["male", "female"], // enum 用于校验字符 [Mongoose v5.11.14: Validation](https://mongoosejs.com/docs/validation.html)
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
});

module.exports = model("User", userSchema);
