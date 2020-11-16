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
	transports: ["websocket", "polling"],
	pingInterval: 1000,
	pingTimeout: 2000,
});
let loggedUsers = [];

const getUniqueListBy = (arr, key) => {
	return [...new Map(arr.map((item) => [item[key], item])).values()];
};

const STATIC_CHANNELS = ["global_notifications", "global_chat"];
io.on("connection", (socket) => {
	//prompt someone connected
	console.log("new client connected");
	//listen to disconnected clients
	socket.on("disconnect", () => {
		console.log("client disconnected:" + socket.id);
		const index = loggedUsers.findIndex((x) => x.socketid === socket.id);
		if (index !== undefined) loggedUsers.splice(index, 1);
		console.log("after" + loggedUsers);
		io.emit("removeusers", loggedUsers);
	});
	socket.on("logout", (data) => {
		console.log("user " + data + " has logout");
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
