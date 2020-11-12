const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
	console.log(`Connected: ${socket.id}`);
	socket.on("disconnect", () => console.log(`Disconnected: ${socket.id}`));
	socket.on("join", (room) => {
		console.log(`Socket ${socket.id} joining ${room}`);
		socket.join(room);
	});
	socket.on("chat", (data) => {
		const { message, room } = data;
		console.log(`msg: ${message}, room: ${room}`);
		io.to(room).emit("chat", message);
	});
});

http.listen(3000, () => {
	console.log("listening on *:3000");
});
