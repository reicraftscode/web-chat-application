import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../Service/Socket";
import Messages from "../Messages/Messages";
import SendMessage from "../SendMessage/SendMessage";
import style from "./Chats.module.scss";
import axios from "axios";
const CREATE_USER_ENDPOINT = "http://localhost:3000/user/create";

const Chats = ({ username, isLoggedIn, image }) => {
	const [userList, setUserList] = useState([]);
	const [isTriggered, setTriggered] = useState(false);
	const socketRef = useRef();
	const endDiv = useRef(null);
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

		//==ONLY USE THIS FOR DEBUGGING==//
		// socketRef.current.on("disconnect", function (reason) {
		// 	alert("Socket disconnected because of " + reason);
		// });
		//==ONLY USE THIS FOR DEBUGGING==//

		if (isLoggedIn === true && isTriggered === false) {
			const data = {
				socketid: socketRef.current.id,
				id: id,
				username: username,
				image: image,
			};
			socketRef.current.emit("login", data);
			setTriggered(true);
			let formData = new FormData();
			formData.append("username", username);
			formData.append("file", image.raw);
			formData.append("url", image.url);
			const insertUser = async () => {
				try {
					const res = await axios.post(CREATE_USER_ENDPOINT, formData);
					console.log(res);
				} catch (err) {
					console.log(err);
				}
			};
			insertUser();
		}
	}, [id, username, userList, isLoggedIn, isTriggered, image]);
	const setUserListToState = (data) => {
		setUserList(data);
	};
	return (
		<div>
			<div className={style.MainDiv}>
				<div className="">
					<div className="">
						<h2 className="">Users</h2>
						{userList.map((user) => {
							return (
								<ul className="list-group" key={Math.random()}>
									<li className="list-group-item">
										<img
											className={style.avatar}
											src={user.image.preview || user.image.url}
											alt="profilename"
										/>
										{username === user.username ? "You" : user.username}
									</li>
								</ul>
							);
						})}
					</div>
				</div>
				<div className={style.MessageDiv}>
					<Messages username={username} endDiv={endDiv} />
				</div>
			</div>
			<div className={style.SendMessageDiv}>
				<SendMessage username={username} image={image} endDiv={endDiv} />
			</div>
		</div>
	);
};
export default Chats;
