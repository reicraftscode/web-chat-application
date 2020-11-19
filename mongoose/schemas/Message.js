const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { connection } = require("../config");

const Message = new Schema({
	data: {
		username: String,
		message: String,
		time: String,
		image: Object,
	},
});
const MessageModel = connection.model("Message", Message);

module.exports = MessageModel;
