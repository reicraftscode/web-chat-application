const mongoose = require("mongoose");
const { connection } = require("../config");
const Schema = mongoose.Schema;

/**
 * @type {Object}
 * @description user variable for declaring schema
 */
const User = new Schema({
	username: String,
	picture: String,
});
/**
 * @type {Object}
 * @description user model schema
 */
const UserModel = connection.model("User", User);
module.exports = UserModel;
