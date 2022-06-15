//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext } from "react";
import StockChart from "./StockChart";
import { LoginContext } from "../Contexts/LoginContext";
import CandlestickChart from "../views/financial charts/Candlestick Chart";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

function HomePage(props) {
  const { chartData } = useContext(LoginContext);
  return (
    <div className="chart">
      {/* <StockChart /> */}
      <CandlestickChart />
      {console.log("heynow")}
    </div>
  );
}

export default HomePage;
