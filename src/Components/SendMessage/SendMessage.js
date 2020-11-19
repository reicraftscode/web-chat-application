import React, { useRef, useEffect, useState } from "react";
import { socket } from "../../Service/Socket";
import moment from "moment";
import style from "./SendMessage.module.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CREATE_MESSAGE_ENDPOINT = "http://localhost:3000/message/create";

const SendMessage = ({ username, image }) => {
	const history = useHistory();
	const [message, setMessage] = useState("");
	const [retainImage, setRetainImage] = useState({});
	const socketRef = useRef();
	socketRef.current = socket;
	useEffect(() => {
		setRetainImage({
			raw: image.raw,
			preview: image.preview,
		});
	}, [image]);
	const data = {
		data: {
			username: username,
			message: message,
			time: moment().format("MMMM DD,YYYY hh:mm:ss"),
			image: image,
		},
	};
	const formData = new FormData();
	formData.append("username", username);
	formData.append("message", message);
	formData.append("time", data.data.time);
	formData.append("file", retainImage.raw);
	formData.append("url", image.url);
	const handleSendMessage = () => {
		if (message === "") {
			alert("Please enter a message");
		} else {
			const insertMessage = async () => {
				const res = await axios.post(CREATE_MESSAGE_ENDPOINT, formData);
				console.log(res);
			};
			insertMessage();
			socketRef.current.emit("message", data);
			setMessage("");
		}
	};
	const handleMessageText = (e) => {
		const message = e.target.value;
		setMessage(message);
	};
	const handleExit = () => {
		socketRef.current.disconnect();
		alert("You have disconnected!");
		history.push("/exit");
	};
	const handleInputEnter = (e) => {
		if (e.keyCode === 13) {
			if (message === "" || message === " " || message === undefined) {
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
					maxLength="50"
					placeholder="Start your conversation and say hi to the group"
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
