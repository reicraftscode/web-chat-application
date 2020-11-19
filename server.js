const PORT = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const formidable = require("formidable");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/static", express.static("public"));
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3001",
		// methods: ["GET", "POST"],
		// allowedHeaders: ["my-custom-header"],
		// credentials: true,
	},
	//specify websocket as transport
	transports: ["websocket"],
	timeout: 15000,
});
const { connection, testConnection } = require("./mongoose/config");
let UserModel = require("./mongoose/schemas/User");
let MessageModel = require("./mongoose/schemas/Message");
testConnection();

let loggedUsers = [];

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
		}
	});
	socket.on("message", (data) => {
		io.emit("message", data);
	});
});
app.post("/user/create", (req, res) => {
	const form = formidable({
		uploadDir: __dirname + "/public", // don't forget the __dirname here
		keepExtensions: true,
	});
	form.parse(req, (err, fields, files) => {
		if (err) console.log(err);
		// console.log(fields);
		// console.log(files);
		if (files.file) {
			const filename = files.file.path.split("/").pop();
			const user = UserModel();
			user.username = fields.username;
			user.picture = "http://localhost:3000/static/" + filename;
			user.save((err) => {
				if (err) return console.log(err);
				console.log("user saved manually");
			});
		} else {
			const user = UserModel();
			user.username = fields.username;
			user.picture = fields.url;
			user.save((err) => {
				if (err) return console.log(err);
				console.log("user saved with link");
			});
		}
	});
	res.status(200);
});
app.post("/message/create", (req, res) => {
	const form = formidable({
		uploadDir: __dirname + "/public", // don't forget the __dirname here
		keepExtensions: true,
	});
	form.parse(req, (err, fields, files) => {
		if (err) console.log(err);
		console.log(fields);
		console.log(files);
		if (files.file) {
			const filename = files.file.path.split("/").pop();
			const message = MessageModel();
			message.data.username = fields.username;
			let unfiltered = fields.message;
			message.data.message = unfiltered.replace(/\n/g, " "); //remove replace if you want the message to be saved in raw format
			message.data.time = fields.time;
			let location = "http://localhost:3000/static/" + filename;
			console.log("location:" + location);
			message.data.image = {
				url: location,
			};
			message.save((err) => {
				if (err) return console.log(err);
				console.log("message saved with file uploaded");
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
			});
		}
	});
});

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

app.get("/usercount", (req, res) => {
	UserModel.countDocuments({}, function (err, count) {
		res.json({ users: count });
	});
});
app.get("/messagecount", (req, res) => {
	MessageModel.countDocuments({}, function (err, count) {
		res.json({ message: count });
	});
});

app.get("/messagelist", function (req, res) {
	console.log("message fired");
	MessageModel.find({}, function (err, messages) {
		res.send({ messages: messages });
	});
});

http.listen(PORT, () => {
	console.log("server running on " + PORT);
});
