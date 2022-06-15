import React, { Component } from "react";
import "./WatchListPage.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import DatatablePage from "./table.jsx";

class WatchListPage extends Component {
	state = {};

	render() {
		return (
			<div className="data">
				<DatatablePage />
			</div>
		);
	}
}

export default WatchListPage;
