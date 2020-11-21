const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { connection } = require("../config");

/**
 * @type {Object}
 * @description message variable for declaring schema
 */
const Message = new Schema({
	data: {
		username: String,
		message: String,
		time: String,
		image: Object,
	},
});
/**
 * @type {Model}
 * @description message schema
 */
const MessageModel = connection.model("Message", Message);

module.exports = MessageModel;
