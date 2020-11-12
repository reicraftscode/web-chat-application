import React, { useEffect } from "react";
import Header from "../Header/Header";
import io from "socket.io-client";
const API_LINK = "http://localhost:3000";
const socket = io.connect(API_LINK, { reconnection: true });

const Chats = () => {
	useEffect(() => {
		socket.on("connect", () => {
			socket.on("broadcast", (message) => {
				console.log(message);
			});
			socket.emit("account", { username: "haxxor69" });
		});
		socket.on("disconnect", () => {
			socket.on("broadcast", (message) => {
				console.log(message);
			});
		});
	}, []);
	return (
		<div>
			<Header />
		</div>
	);
};
export default Chats;
