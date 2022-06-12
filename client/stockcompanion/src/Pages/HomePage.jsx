//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext } from "react";
import StockChart from "./StockChart";
import { LoginContext } from "../Contexts/LoginContext";

function HomePage(props) {
  const { chartData } = useContext(LoginContext);
  return (
    <div>
      <StockChart />
    </div>
  );
}

export default HomePage;
