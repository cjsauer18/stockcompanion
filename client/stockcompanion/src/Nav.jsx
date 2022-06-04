import "./styles.css";
import React from "react";

import { Link } from "react-router-dom";

// import your route components too

function Nav() {
	return (
		<div>
			<div className="navbar">
				<Link to="/">Home</Link>
				<Link to="WatchListPage">Watch List</Link>
			</div>
		</div>
	);
}
export default Nav;
