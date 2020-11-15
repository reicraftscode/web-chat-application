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
	transports: ["websocket", "polling"],
});
let loggedUsers = [];

const STATIC_CHANNELS = ["global_notifications", "global_chat"];
io.on("connection", (socket) => {
	//prompt someone connected
	console.log("new client connected");
	//listen to disconnected clients
	socket.on("disconnect", () => {
		console.log("client disconnected");
		loggedUsers = loggedUsers.filter((data) => {
			if (data.socketid != socket.id) {
				return data;
			}
		});
		socket.emit("onlineusers", loggedUsers);
	});
	//emit a message once a user connected
	socket.on("login", (data) => {
		console.log(data.username + " has logged in ");
		loggedUsers.push(data);
		io.emit("onlineusers", loggedUsers);
	});
});

http.listen(PORT, () => {
	console.log("server running on " + PORT);
});
