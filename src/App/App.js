import style from "./App.module.scss";
import React, { useState, useEffect } from "react";
import Randomizer from "./Randomizer";
import Header from "../Header/Header";
import Chats from "../Components/Chats/Chats";
const username = "B" + Randomizer().join("");

const App = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [image, setImage] = useState({ preview: "", raw: "", url: "" });
	const handleLogin = () => {
		setLoggedIn(true);
		if (image.preview === "" || image.preview === undefined) {
			const randomnum = Math.floor(Math.random() * 5);
			if (randomnum === 0) {
				setImage({
					url: "./assets/photos/bees/bee.png",
				});
			} else if (randomnum === 1) {
				setImage({
					url: "./assets/photos/bees/bee1.png",
				});
			} else if (randomnum === 2) {
				setImage({
					url: "./assets/photos/bees/bee2.png",
				});
			} else if (randomnum === 3) {
				setImage({
					url: "./assets/photos/bees/bee3.png",
				});
			} else if (randomnum === 4) {
				setImage({
					url: "./assets/photos/bees/bee4.png",
				});
			} else if (randomnum === 5) {
				setImage({
					url: "./assets/photos/bees/bee5.png",
				});
			}
		}
	};
	const handleChange = (e) => {
		if (e.target.files.length) {
			setImage({
				preview: URL.createObjectURL(e.target.files[0]),
				raw: e.target.files[0],
			});
		}
	};
	const MainContent = () => {
		return (
			<div>
				{/* Start dashboard content */}
				<div className={style.content}>
					<p className={style.welcomeText}>Welcome to ChatBee</p>
					<div className={`${style.contentWrapper} justify-content-center`}>
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
									onChange={handleChange}
								/>
								<label className="custom-file-label" htmlFor="customFileLang">
									{image.preview ? "Uploaded" : "Upload your avatar"}
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
			<div className={style.chatWrapper}>
				<div
					style={isLoggedIn ? { display: "block" } : { display: "none" }}
					className="mt-5 container-fluid"
				>
					<Chats username={username} isLoggedIn={isLoggedIn} image={image} />
				</div>
			</div>
		</div>
	);
};

export default App;
