const mongoose = require("mongoose");
const { connection } = require("../config");
const Schema = mongoose.Schema;

const User = new Schema({
	username: String,
	picture: String,
});
const UserModel = connection.model("User", User);
module.exports = UserModel;
