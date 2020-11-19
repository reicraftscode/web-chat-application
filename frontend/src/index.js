import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./App/App";
import Exit from "./Exit/Exit";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
const RoutedComponent = () => (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route exact path="/exit" component={Exit} />
		</div>
	</Router>
);
ReactDOM.render(
	<React.StrictMode>
		<RoutedComponent />
	</React.StrictMode>,
	document.getElementById("root")
);
// This monitors the speed and etc.
reportWebVitals(console.log);
