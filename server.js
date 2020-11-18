const { createSocket } = require("dgram");
const express = require("express");
const PORT = 3000;
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3001",
		// methods: ["GET", "POST"],
		// allowedHeaders: ["my-custom-header"],
		// credentials: true,
	},
	transports: ["websocket"],
	timeout: 15000,
});
let loggedUsers = [];

const STATIC_CHANNELS = ["global_notifications", "global_chat"];
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

http.listen(PORT, () => {
	console.log("server running on " + PORT);
});
