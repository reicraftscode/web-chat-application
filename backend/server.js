/**
 * @module server.js
 * @description this is the main server file for the backend
 */

/**
 * @type {number}
 * @description the port of the backend web app
 */
const PORT = 3000;
/**
 * @description require the express framework
 */
const express = require("express");
/**
 * @description initializes the express into app variable
 */
const app = express();
/**
 * @description require the cors to allow the frontend to access the backend
 */
const cors = require("cors");
/**
 * @description require the body-parser middleware
 */
const bodyParser = require("body-parser");
/**
 * @description require the formidable (this will handle all the files in the server)
 */
const formidable = require("formidable");
/**
 * @description require the morgan (will log every requests in server)
 */
const morgan = require("morgan");
/**
 * @description require the path to allow directory linking
 */
const path = require("path");
/**
 * @description require the rotating-file-stream to allow changing filestream per day
 */
const rfs = require("rotating-file-stream");

/**
 * @description rotates the file daily in the logs directory with access.log
 */
let accessLogStream = rfs.createStream("access.log", {
	interval: "1d", // rotate daily
	path: path.join(__dirname, "logs"),
});
/**
 * @description use the cors middleware and allow access from all origins
 */
app.use(cors());
/**
 * @description use the morgan middleware to make logs
 */
app.use(morgan("combined", { stream: accessLogStream }));
/**
 * @description use the bodyParser middleware to allow json
 */
app.use(bodyParser.json());
/**
 * @description use the bodyParser middleware to allow url encoded data
 */
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * @description use the build in static express middleware to allow serving files
 */
app.use(express.static("public"));
/**
 * @description add route for static /static endpoint. All assets from the public directory will be accessed
 */
app.use("/static", express.static("public"));
/**
 * @description create http server from express app
 */
const http = require("http").createServer(app);
/**
 * @description requires socket.io and allows port 3001 to acccess the port.
 */
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3001",
	},
	//specify websocket as transport
	transports: ["websocket"],
	timeout: 15000,
});
/**
 * @description added utilities to manipulate connection and test it
 * @function
 * @returns {string} mongoose connected or error
 */
const testConnection = require("./mongoose/config");
/**
 * @description access mongodb connection
 */
const connection = require("./mongoose/config");
/**
 * @description access mongodb user model to handle data
 */
let UserModel = require("./mongoose/schemas/User");
/**
 * @description access mongodb message model to handle data
 */
let MessageModel = require("./mongoose/schemas/Message");

//invoke test connection
testConnection();

/**
 * @description logged users variable
 */
let loggedUsers = [];

//listens to connecetions
io.on("connection", (socket) => {
	//prompt someone connected
	console.log("new client connected");
	//listen to disconnected clients
	socket.on("disconnect", () => {
		//check index
		const index = loggedUsers.findIndex((x) => x.socketid === socket.id);
		//send a notice that the user has disconnected
		if (loggedUsers[index] != undefined) {
			console.log(`user ${loggedUsers[index].username} has logged out`);
		}
		//remove if index detected
		if (index !== undefined) loggedUsers.splice(index, 1);
		//emit remove users to remove user in frontend
		io.emit("removeusers", loggedUsers);
		console.log("a user has disconnected");
	});
	socket.on("logout", (data) => {
		//if socket is disconnected for some reason
		console.log(data);
		console.log("user " + data.username + " has logout");
	});
	//emit a message once a user connected
	socket.on("login", (data) => {
		//inform about a user has logged in
		console.log(data.username + " has logged in ");
		//if data is not in array then push the data
		if (!loggedUsers.includes(data)) {
			loggedUsers.push(data);
			//add to online users
			io.emit("onlineusers", loggedUsers);
			//login as well
			io.emit("login", data);
		}
	});
	//listen message from client then emit it to all
	socket.on("message", (data) => {
		io.emit("message", data);
	});
});

/**
 * @path {POST} /user/create
 * @name create_users
 * @description creates a user and insert it to the database
 * @header {blob} file userimage (optional)
 * @header {String} username name of the user
 * @header {String} picture link to the picture
 */
app.post("/user/create", (req, res) => {
	const form = formidable({
		uploadDir: __dirname + "/public", // don't forget the __dirname here
		keepExtensions: true,
	});
	form.parse(req, (err, fields, files) => {
		if (err) console.log(err);
		if (files.file) {
			const filename = files.file.path.split("/").pop();
			const user = UserModel();
			user.username = fields.username;
			user.picture = "http://localhost:3000/static/" + filename;
			user.save((err) => {
				if (err) return console.log(err);
				console.log("user saved manually");
				res.sendStatus(200);
			});
		} else {
			const user = UserModel();
			user.username = fields.username;
			user.picture = fields.url;
			user.save((err) => {
				if (err) return console.log(err);
				console.log("user saved with link");
				res.sendStatus(200);
			});
		}
	});
	res.status(200);
});
/**
 * @path {POST} /message/create
 * @name create_messages
 * @description creates a message and insert it to the database
 * @header {blob} file user image (optional)
 * @header {String} username name of the user
 * @header {String} message content of the message
 * @header {String} time time the message was send
 * @header {blob} image {url:location}
 *
 * */
app.post("/message/create", (req, res) => {
	const form = formidable({
		uploadDir: __dirname + "/public", // don't forget the __dirname here
		keepExtensions: true,
	});
	form.parse(req, (err, fields, files) => {
		if (err) console.log(err);
		if (files.file) {
			const filename = files.file.path.split("/").pop();
			const message = MessageModel();
			message.data.username = fields.username;
			let unfiltered = fields.message;
			message.data.message = unfiltered.replace(/\n/g, " "); //remove replace if you want the message to be saved in raw format
			message.data.time = fields.time;
			let location = "http://localhost:3000/static/" + filename;
			message.data.image = {
				url: location,
			};
			message.save((err) => {
				if (err) return console.log(err);
				console.log("message saved with file uploaded");
				res.sendStatus(200);
			});
		} else {
			const message = MessageModel();
			message.data.username = fields.username;
			let unfiltered = fields.message;
			message.data.message = unfiltered.replace(/\n/g, " "); //remove replace if you want the message to be saved in raw format
			message.data.time = fields.time;
			message.data.image = { url: fields.url };
			message.save((err) => {
				if (err) return console.log(err);
				console.log("message saved");
				res.sendStatus(200);
			});
		}
	});
});
/**
 * @path {GET} /user/get
 * @name get_users
 * @description searches a user from the database
 * @header {String} username name of the user
 *
 * */
app.post("/user/get", (req, res) => {
	const userToFind = req.body.username;
	UserModel.findOne({ username: userToFind }, (err, user) => {
		if (err) console.log(err);
		console.log(userToFind);
		if (user) {
			res.send(user).status(409);
		} else {
			res.sendStatus(200);
		}
	});
});
//get all users who registered
/**
 * @path {GET} /usercount
 * @name usercount
 * @description counts users from database
 *
 * */
app.get("/usercount", async (req, res) => {
	UserModel.countDocuments({}, function (err, count) {
		res.send(count.toString());
	});
});
//get all messages count
/**
 * @path {GET} /messagecount
 * @name messagecount
 * @description searches a user from the database
 *
 * */
app.get("/messagecount", async (req, res) => {
	MessageModel.countDocuments({}, function (err, count) {
		res.send(count.toString());
	});
});
//get all messages for a feature in the frontend
/**
 * @path {GET} /messagelist
 * @name messagelist
 * @description searches all messages
 * @returns {json} returns all messages
 *
 * */
app.get("/messagelist", async (req, res) => {
	console.log("message fired");
	MessageModel.find({}, function (err, messages) {
		res.send({ messages: messages });
	});
});

/**
 * @description run the server on port 3000
 */
http.listen(PORT, () => {
	console.log("server running on " + PORT);
});

module.exports = { app, http };
