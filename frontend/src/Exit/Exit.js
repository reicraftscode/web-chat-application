import React from "react";
import Header from "../Header/Header";
// uncomment this if you need to you custom designs
// import style from "./Exit.scss";
const Exit = () => {
	return (
		<div>
			<Header />
			<div className={`container-fluid mt-5`}>
				<div className="row">
					<img
						className="img-fluid mx-auto"
						alt="exit message"
						src="/assets/photos/undraw_Smiley.svg"
					/>
				</div>
				<div className="mt-3">
					<h3 className="text-center font-weight-bold">
						You exited the chat please come back here soon!
					</h3>
				</div>
			</div>
		</div>
	);
};
export default Exit;
