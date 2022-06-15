//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import ApexChart from "../Chart/ApexChart";

function HomePage(props) {
  const { chartData } = useContext(LoginContext);
  return (
    <div className="chart">
      <ApexChart />
      {console.log("heynow")}
    </div>
  );
}

export default HomePage;
