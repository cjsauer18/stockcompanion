import React, { useEffect, useState, useContext } from "react";
import ApexChart from "./ApexChart";
import "./Chart.css";
import { StockContext } from "../Contexts/StockContext";

function Chart(props) {
  const { stockData, setStockData } = useContext(StockContext);
  const [chartData, setChartData] = useState("");

  // setTimeout(){
  //    data = fetchData()
  //    let updatedStock = stock;
  //     updatedStock.data = data;
  //    setStock(updatedStock);
  // }

  const handleIntervalChange = (interval) => {
    // let updatedStock = stock;
    // if (interval == 1) {
    ///  updatedStock.setInterval(interval);
    //stock is updated with new interval
    //fetchData(updatedStock);
    //setStock(updatedStock);
  };

  const handleRangeChange = (range) => {};

  return (
    <div className="chart-container">
      <h1>Interval</h1>
      <button
        onClick={() => handleIntervalChange(1)}
        className="interval-select"
      >
        1m
      </button>
      <button className="interval-select">5m</button>
      <button className="interval-select">30m</button>
      <button className="interval-select">1hr</button>
      <button className="interval-select">1wk</button>
      <button className="interval-select">1m</button>
      <ApexChart />
      <h1>Date Range</h1>
      <button className="range-select">1d</button>
      <button className="range-select">1w</button>
      <button className="range-select">1m</button>
      <button className="range-select">6m</button>
      <button className="range-select">1yr</button>
    </div>
  );
}

export default Chart;
