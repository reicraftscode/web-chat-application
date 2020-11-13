import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import io from "socket.io-client";
import moment from "moment";
const API_LINK = "http://localhost:3000";
const socketOptions = {
	reconnection: true,
	transports: ["websocket", "polling"],
};
const socket = io.connect(API_LINK, socketOptions);
const username = prompt("username");

const Chats = () => {
	const [users, setUsers] = useState([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		socket.on("connect", () => {
			socket.emit("username", username);
		});
		socket.on("users", (users) => {
			setUsers(users);
		});
		socket.on("message", (message) => {
			setMessages((messages) => [...messages, message]);
		});
		socket.on("connected", (user) => {
			setUsers((users) => [...users, user]);
		});
		socket.on("disconnected", (id) => {
			setUsers((users) => {
				return users.filter((user) => user.id !== id);
			});
		});
		socket.on("broadcast", (message) => {
			console.log(message);
		});
		// return () => socket.disconnect();
	}, []);

	const submit = (event) => {
		event.preventDefault();
		socket.emit("send", message);
		setMessage("");
	};

	return (
		<div>
			<Header />
		</div>
	);
};
export default Chats;
