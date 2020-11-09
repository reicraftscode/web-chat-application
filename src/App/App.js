import style from "./App.module.scss";
import Randomizer from "./Randomizer";
const App = () => {
	let username = Randomizer().join("");
	return (
		<div>
			{/* Logo wrapper div */}
			<div className={`bg-dark ${style.logoWrapper}`}>
				<div className={`${style.logoIconTextWrapper}`}>
					<img
						className={style.beeIcon}
						alt="bee icon"
						src="./assets/photos/bee.svg"
					></img>
					<h3 className={style.beeText}>ChatBee</h3>
				</div>
			</div>
			{/* End logo wrapper div */}
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
