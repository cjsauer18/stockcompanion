//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext } from "react";
import StockChart from "./StockChart";
import { LoginContext } from "../Contexts/LoginContext";
import CandlestickChart from "../views/financial charts/Candlestick Chart";

function HomePage(props) {
  const { chartData } = useContext(LoginContext);
  return (
    <div>
      {/* <StockChart /> */}
      <CandlestickChart />
      {console.log("heynow")}
    </div>
  );
}

export default HomePage;
