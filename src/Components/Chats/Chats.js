import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { io, socket } from "../../Service/Socket";

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
			socketRef.current.emit("login", data);
		});
		socketRef.current.on("onlineusers", (data) => {
			setUserListToState(data);
		});
		socketRef.current.on("removeusers", (data) => {
			setUserListToState(data);
		});
		socketRef.current.on("disconnect", (data) => {
			socketRef.current.emit("logout", { username: username });
		});
	}, [id, username]);
	const setUserListToState = (data) => {
		setUserList(data);
	};
	return (
		<div className="row border border-info">
			<div className="col col-md-2">
				{userList.map((user, index) => {
					return (
						<ul key={index}>
							<p>
								{username === user.username ? "You" : user.username} logged in
							</p>
						</ul>
					);
				})}
			</div>
		</div>
	);
};
export default Chats;
