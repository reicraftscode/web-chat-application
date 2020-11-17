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

const STATIC_CHANNELS = ["global_notifications", "global_chat"];
io.on("connection", (socket) => {
	//prompt someone connected
	console.log("new client connected");
	//listen to disconnected clients
	socket.on("disconnect", () => {
		//check index
		const index = loggedUsers.findIndex((x) => x.socketid === socket.id);
		//remove if index detected
		if (index !== undefined) loggedUsers.splice(index, 1);
		// console.log("removed" + JSON.stringify(loggedUsers));
		//emit remove users to remove user in frontend
		io.emit("removeusers", loggedUsers);
	});
	socket.on("logout", (data) => {
		//if socket is disconnected for some reason
		console.log("user " + data.username + " has logout");
	});
	//emit a message once a user connected
	socket.on("login", (data) => {
		//inform about a user has logged in
		console.log(data.username + " has logged in ");
		//if data is not in array then push the data
		if (!loggedUsers.includes(data)) {
			loggedUsers.push(data);
		}
		//add to online users
		io.emit("onlineusers", loggedUsers);
		//emit a welcome message
		io.emit("message", {
			data: {
				username: data.username,
				message: `${data.username} has logged in `,
			},
		});
	});
	socket.on("message", (data) => {
		console.log(data);
	});
});

http.listen(PORT, () => {
	console.log("server running on " + PORT);
});
