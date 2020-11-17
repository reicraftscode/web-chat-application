import style from "./App.module.scss";
import React, { useState, useEffect } from "react";
import Randomizer from "./Randomizer";
import Header from "../Header/Header";
import Chats from "../Components/Chats/Chats";
const username = "B" + Randomizer().join("");

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const handleLogin = () => {
		setLoggedIn(true);
	};
	const MainContent = () => {
		return (
			<div>
				{/* Start dashboard content */}
				<div className={style.content}>
					<p className={style.welcomeText}>Welcome to ChatBee</p>
					<div className="d-flex justify-content-center">
						<img
							alt="bee hive"
							className={style.beehivePic}
							src="./assets/photos/beehive.svg"
						/>
						<div className={style.chats}>
							<p>Your username is: B{username}</p>
							<div className="custom-file">
								<input
									type="file"
									className="custom-file-input"
									id="customFileLang"
									lang="pl-Pl"
									accept="images/*"
								/>
								<label className="custom-file-label" htmlFor="customFileLang">
									Upload your avatar
								</label>
							</div>
							<button
								onClick={() => handleLogin()}
								type="button"
								className={`btn btn-primary ${style.hiveButton} mt-5`}
							>
								Enter the hive
							</button>
						</div>
					</div>
				</div>
				{/* End dashboard content */}
			</div>
		);
	};
	return (
		<div>
			<Header />
			<div style={isLoggedIn ? { display: "none" } : { display: "block" }}>
				<MainContent />
			</div>
			<div
				style={isLoggedIn ? { display: "block" } : { display: "none" }}
				className="mt-5 ml-5"
			>
				<Chats username={username} />
			</div>
		</div>
	);
};

export default App;
