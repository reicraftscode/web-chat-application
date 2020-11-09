import style from "./App.module.scss";
import React from "react";
import Randomizer from "./Randomizer";
import Header from "../Header/Header";
const App = () => {
	let username = Randomizer().join("");
	return (
		<div>
			<Header />
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

export default App;
