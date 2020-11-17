import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { io, socket } from "../../Service/Socket";
import Messages from "../Messages/Messages";

const Chats = ({ username }) => {
	const [userList, setUserList] = useState([]);

	const socketRef = useRef();
	const id = Math.floor(Math.random() * 5);
	useEffect(() => {
		socketRef.current = socket;

		socketRef.current.on("connect", () => {
			const data = {
				socketid: socketRef.current.id,
				id: id,
				username: username,
				// time: moment().format("MMMM DD,YYYY hh:mm A"),
			};
			socketRef.current.emit("message", {
				data: { message: `${username} has logged in` },
			});
			socketRef.current.emit("login", data);
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
		socketRef.current.on("disconnect", (data) => {
			socketRef.current.emit("logout", { username: username });
		});
	}, [id, username, userList]);
	const setUserListToState = (data) => {
		setUserList(data);
	};
	return (
		<div>
			<div className="row">
				<div className="col col-md-2">
					<h2 className="ml-2">Users</h2>
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
				<div className="ml-5">
					<Messages username={username} />
				</div>
			</div>
		</div>
	);
};
export default Chats;
