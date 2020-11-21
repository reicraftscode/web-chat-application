import React, { useRef, useEffect, useState } from "react";
import { socket } from "../../Service/Socket";
import style from "./Messages.module.scss";
import axios from "axios";

const API_MESSAGES_ENDPOINT = "http://localhost:3000/messagelist";
const Messages = ({ username, endDiv }) => {
	const socketRef = useRef();
	const [messages, setMessages] = useState([]);
	const [retreivedMessage, setRetrievedMessage] = useState([]);
	const [isShown, setShown] = useState(false);
	console.log(messages);

	useEffect(() => {
		socketRef.current = socket;
		socketRef.current.on("message", (data) => {
			setMessages((messages) => [...messages, data]);
			if (!endDiv.current) {
				return;
			} else {
				endDiv.current.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		});
		socketRef.current.on("login", (data) => {
			const newData = {
				data: {
					image: { url: "./assets/photos/admin.png" },
					message: data.username + " has logged in",
					time: "",
					username: "Server",
				},
			};
			setMessages((messages) => [...messages, newData]);
		});
		socketRef.current.on("removeusers", (data) => {
			const newData = {
				data: {
					image: { url: "./assets/photos/admin.png" },
					message: data[0].username + " has logged out",
					time: "",
					username: "Server",
				},
			};
			setMessages((messages) => [...messages, newData]);
		});
		try {
			const retrieveData = async () => {
				const res = await axios.get(API_MESSAGES_ENDPOINT);
				const incoming = await res.data.messages;
				setRetrievedMessage(incoming);
			};
			retrieveData();
		} catch (err) {
			console.log(err);
		}
	}, [endDiv]);

	const handleMouseHover = () => {
		setShown(true);
	};
	const handleMouseOut = () => {
		setShown(false);
	};
	return (
		<div className={style.MainDiv}>
			<h3 className="font-weight-bold">Chat Messages</h3>
			<div
				id="messagetext"
				className={`mt-3 ${style.messagesContainer} container-fluid`}
			>
				{!(retreivedMessage.length || messages.length) ? "No messages yet" : ""}
				{retreivedMessage.map((message) => {
					return (
						<div
							onMouseEnter={() => handleMouseHover()}
							onMouseLeave={() => handleMouseOut()}
							key={Math.random()}
							className={
								message.data.username === username
									? style.messageOwner
									: style.messageReceiver
							}
						>
							<img
								className={style.avatar}
								src={message.data.image.url || message.data.image.preview}
								alt="user avatar"
							/>
							<div className="ml-3">
								{message.data.username === username
									? "You:"
									: message.data.username + ":"}
								<br />
								<div className="d-flex">
									<p>{message.data.message}</p>
									<p className="ml-5">{isShown ? message.data.time : ""}</p>
								</div>
							</div>
						</div>
					);
				})}
				{messages.map((message) => {
					return (
						<div
							onMouseEnter={() => handleMouseHover()}
							onMouseLeave={() => handleMouseOut()}
							key={message.data.time + Math.random().toString()}
							className={
								message.data.username === username
									? style.messageOwner
									: style.messageReceiver
							}
						>
							<img
								className={style.avatar}
								src={message.data.image.preview || message.data.image.url}
								alt="user avatar"
							/>
							<div className="ml-3">
								{message.data.username === username
									? "You:"
									: message.data.username + ":"}
								<br />
								<div className="d-flex ">
									<p>{message.data.message}</p>
									<p className="ml-5">{isShown ? message.data.time : ""}</p>
								</div>
							</div>
							<div ref={endDiv} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Messages;
