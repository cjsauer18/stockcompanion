import React, { Component } from "react";

//import ApexChart from "../Chart/ApexChart.jsx";
import Apps from "./new_chart";

class HomePage extends Component {
  state = {};

  render() {
    return (
      //	<div>
      //			<img src={require("./demochart.jpeg")} alt="demochart" height="500px" />
      //		</div>
      <div>
        <Apps />
      </div>
    );
  }
}

export default HomePage;
