import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals(console.log);
