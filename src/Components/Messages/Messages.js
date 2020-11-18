import React, { useRef, useEffect, useState } from "react";
import { io, socket } from "../../Service/Socket";
import style from "./Messages.module.scss";

const Messages = ({ username }) => {
	const socketRef = useRef();
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		socketRef.current = socket;
		socketRef.current.on("message", (data) => {
			setMessages([...messages, data]);
		});
	}, [messages]);

	return (
		<div className={style.MainDiv}>
			<h2>Messages</h2>
			<div className={`mt-3 ${style.messagesContainer} container-fluid`}>
				{messages.map((message, index) => {
					return (
						<p
							key={index}
							className={
								message.data.username === username
									? style.messageOwner
									: style.messageReceiver
							}
						>
							{message.data.username === username
								? "You:"
								: message.data.username + ":"}
							{message.data.message}
						</p>
					);
				})}
			</div>
		</div>
	);
};
export default Messages;
