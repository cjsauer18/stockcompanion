//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext, useState } from "react";
import { StockContext } from "../Contexts/StockContext";
//import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import ApexChart from "../Chart/ApexChart";
import SearchBar from "../Components/SearchBar";
import stockdata from "./SearchData";
import Footnote from "../Components/Footnote";
import Chart from "../Chart/Chart";
//have a handleButton function that takes as input the start range for the graph.
//it takes the stock obect and calls .setStart() which is set as the context again.

function HomePage(props) {
  const { chartData } = useContext(StockContext);
  return (
    //  <div className="searchstock">
    // <SearchBar />
    <div className="home-page">
      <SearchBar placeholder="Enter Stock Ticker" data={stockdata} />
      <Chart />
      <Footnote />
    </div>
  );
}

export default HomePage;
