import React, { useRef, useEffect, useState } from "react";
import { io, socket } from "../../Service/Socket";

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
		<div>
			<h2>Messages</h2>
			<div className="mt-3 ">
				{messages.map((message, index) => {
					console.log(username, message.data.username);
					return (
						<div key={index}>
							<p>
								{message.data.username === username
									? "You"
									: message.data.username}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Messages;
