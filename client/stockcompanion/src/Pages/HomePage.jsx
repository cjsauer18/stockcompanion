//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext } from "react";
import { StockContext } from "../Contexts/StockContext";
//import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import ApexChart from "../Chart/ApexChart";
import SearchBar from "../Components/Searchnew";
import stockdata from "./SearchData";

function HomePage(props) {
  const { chartData } = useContext(StockContext);
  return (
    //  <div className="searchstock">
    // <SearchBar />
    <div className="searchstock">
      <SearchBar placeholder="Enter Stock Ticker" data={stockdata} />
      <div className="chart">
        <ApexChart />
        {console.log("heynow")}
      </div>
    </div>
  );
}

export default HomePage;
