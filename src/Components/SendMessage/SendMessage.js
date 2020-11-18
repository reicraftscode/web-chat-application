import React, { useRef, useEffect, useState } from "react";
import { io, socket } from "../../Service/Socket";
import moment from "moment";

const SendMessage = ({ username }) => {
	const [message, setMessage] = useState("");
	const socketRef = useRef();
	socketRef.current = socket;
	const handleSendMessage = () => {
		if (message === "") {
			alert("Please enter a message");
		} else {
			socketRef.current.emit("message", {
				data: {
					username: username,
					message: message,
					time: moment().format("MMMM DD,YYYY hh:mm A"),
				},
			});
			setMessage("");
		}
	};
	const handleMessageText = (e) => {
		setMessage(e.target.value);
	};
	const handleInputEnter = (e) => {
		if (e.keyCode === 13) {
			handleSendMessage();
		}
	};
	return (
		<div>
			<div>
				<input
					type="text"
					onChange={handleMessageText}
					value={message}
					required={true}
					onKeyDown={handleInputEnter}
				/>
				<button onClick={() => handleSendMessage()}>Test emit</button>
			</div>
		</div>
	);
};
export default SendMessage;
