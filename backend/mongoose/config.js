/**
 * @module mongoose
 * @description configuration for mongoose
 */

/**
 * @description requires mongoose
 */
const mongoose = require("mongoose");

/**
 * @description variable for mongoose
 */
const MONGO_URI =
	"mongodb+srv://admin:adminpassword01@cluster0.ipmfe.mongodb.net/chatbee?retryWrites=true&w=majority";

/**
 * @description connect to mongoose
 */
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

/**
 * @description declare connections
 */
const connection = mongoose.connection;

/**
 * @function testConnection
 * @returns {string} error or connected
 */
const testConnection = () => {
	connection.on("error", () => {
		console.error.bind(console, "connection error:");
		return "error";
	});
	connection.once("open", () => {
		console.log("mongo connected");
		return "connected";
	});
};

module.exports = {
	testConnection,
	connection,
};
