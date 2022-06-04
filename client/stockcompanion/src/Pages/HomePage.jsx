import React, { Component } from "react";

//import ApexChart from "../Chart/ApexChart.jsx";
//import ApexChart from '../Chart/apexcharts';

class HomePage extends Component {
	state = {};

	render() {
		return (
			<div>
				<img src={require("./demochart.jpeg")} alt="demochart" height="500px" />
			</div>
		);
	}
}

export default HomePage;
