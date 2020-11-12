import React from "react";
import ReactDOM from "react-dom";
import "./custom.scss";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import Exit from "./Exit/Exit";
import Chat from "./Chats/Chats";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
const Routing = () => {
	return (
		<Router>
			<Switch>
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Route exact path="/" component={App} />
				<Route exact path="/chat" component={Chat} />
				<Route exact path="/exit" component={Exit} />
			</Switch>
		</Router>
	);
};
ReactDOM.render(
	<React.StrictMode>
		<Routing />
	</React.StrictMode>,
	document.getElementById("root")
);
// This monitors the speed and etc.
reportWebVitals(console.log);
