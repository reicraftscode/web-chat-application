import React, { useRef, useEffect, useState } from "react";
import { io, socket } from "../../Service/Socket";
import moment from "moment";
import style from "./SendMessage.module.scss";
import { useHistory } from "react-router-dom";

const SendMessage = ({ username }) => {
	const history = useHistory();
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
					time: moment().format("MMMM DD,YYYY hh:mm:ss"),
				},
			});
			setMessage("");
		}
	};
	const handleMessageText = (e) => {
		setMessage(e.target.value);
	};
	const handleExit = () => {
		socketRef.current.disconnect();
		alert("You have disconnected!");
		history.push("/exit");
	};
	const handleInputEnter = (e) => {
		if (e.keyCode === 13) {
			if (message === "") {
				alert("Please enter a message");
			}
			if (!e.shiftKey) {
				handleSendMessage();
			}
		}
	};
	return (
		<div>
			<div className={style.chatBoxWrapper}>
				<h3 className="font-weight-bold">Chat Now!</h3>
				<textarea
					className={style.chatInput}
					type="text"
					onChange={handleMessageText}
					value={message}
					required={true}
					onKeyUp={handleInputEnter}
				/>
				<button
					className={style.sendButton}
					onClick={() => handleSendMessage()}
				>
					Send
				</button>
				<button className={style.exitButton} onClick={() => handleExit()}>
					Exit Chat
				</button>
			</div>
		</div>
	);
};
export default SendMessage;
