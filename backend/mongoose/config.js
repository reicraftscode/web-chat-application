const mongoose = require("mongoose");

const MONGO_URI =
	"mongodb+srv://admin:admin@cluster0.yiwgy.mongodb.net/chatbee?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const connection = mongoose.connection;

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
