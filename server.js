const { Socket } = require("socket.io");

const server = require("http").createServer();
const options = {
	cors: true,
	origins: ["http://localhost:3001"],
};
const io = require("socket.io")(server, options);

// io.on("connection", (socket) => {
// 	console.log(`Connected: ${socket.id}`);
// 	socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
// 	socket.on("join", (room) => {
// 		console.log(`Socket ${socket.id} joining ${room}`);
// 		socket.join(room);
// 	});
// 	socket.on("chat", (data) => {
// 		const { message, room } = data;
// 		console.log(`msg: ${message}, room: ${room}`);
// 		io.to(room).emit("chat", message);
// 	});
// });
try {
	const users = {};
	io.on("connection", (client) => {
		client.on("username", (username) => {
			console.log(username + " has logged in");
			client.broadcast.emit("broadcast", `${username} has connected`);
			const user = {
				name: username,
				id: client.id,
			};
			users[client.id] = user;
			io.emit("connected", user);
			io.emit("users", Object.values(users));
		});

		client.on("send", (message) => {
			io.emit("message", {
				text: message,
				date: new Date().toISOString(),
				user: users[client.id],
			});
		});

		client.on("disconnect", () => {
			const username = users[client.id];
			if (username != undefined) {
				console.log(username.name + " has logged out");
				client.broadcast.emit("broadcast", `${username.name} has disconnected`);
			}
			delete users[client.id];
			io.emit("disconnected", client.id);
		});
	});
} catch (err) {
	console.error(err);
}
server.listen(3000);
