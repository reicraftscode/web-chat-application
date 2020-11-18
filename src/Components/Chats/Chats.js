import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { io, socket } from "../../Service/Socket";
import Messages from "../Messages/Messages";
import SendMessage from "../SendMessage/SendMessage";
import style from "./Chats.module.scss";

const Chats = ({ username, isLoggedIn }) => {
	const [userList, setUserList] = useState([]);
	const [isTriggered, setTriggered] = useState(false);
	const socketRef = useRef();
	const id = Math.floor(Math.random() * 5);
	useEffect(() => {
		socketRef.current = socket;
		socketRef.current.on("connect", () => {
			console.log("You are connected to the server");
		});
		socketRef.current.on("onlineusers", (data) => {
			if (!userList.includes(data)) {
				setUserListToState(data);
			}
		});
		socketRef.current.on("removeusers", (data) => {
			if (!userList.includes(data)) {
				setUserListToState(data);
			}
		});
		socketRef.current.on("disconnect", function (reason) {
			alert("Socket disconnected because of " + reason);
		});

		if (isLoggedIn === true && isTriggered === false) {
			const data = {
				socketid: socketRef.current.id,
				id: id,
				username: username,
				// time: moment().format("MMMM DD,YYYY hh:mm A"),
			};
			socketRef.current.emit("login", data);
			setTriggered(true);
		}
	}, [id, username, userList, isLoggedIn, isTriggered]);
	const setUserListToState = (data) => {
		setUserList(data);
	};
	return (
		<div>
			<div className={style.MainDiv}>
				<div className="">
					<div className="">
						<h2 className="">Users</h2>
						{userList.map((user, index) => {
							return (
								<ul className="list-group" key={index}>
									<li className="list-group-item">
										{username === user.username ? "You" : user.username}
									</li>
								</ul>
							);
						})}
					</div>
				</div>
				<div className={style.MessageDiv}>
					<Messages username={username} />
				</div>
			</div>
			<div className={style.SendMessageDiv}>
				<SendMessage username={username} />
			</div>
		</div>
	);
};
export default Chats;
