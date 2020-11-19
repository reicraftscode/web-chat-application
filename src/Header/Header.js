import React from "react";
import style from "./Header.module.scss";

const Header = () => {
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
		</div>
	);
};
export default Header;
