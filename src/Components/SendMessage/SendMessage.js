import React, { useRef, useEffect, useState } from "react";
import { io, socket } from "../../Service/Socket";
import moment from "moment";

const SendMessage = () => {
	const socketRef = useRef();
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		socketRef.current = socket;
		socketRef.current.on("message", (data) => {
			console.log(data);
		});
	}, []);
	return (
		<div>
			<div>
				{messages.map((message) => {
					return <p>{message}</p>;
				})}
			</div>
		</div>
	);
};
export default SendMessage;
