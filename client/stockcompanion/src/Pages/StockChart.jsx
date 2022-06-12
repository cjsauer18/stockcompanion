import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";

const axios_ = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

function StockChart(props) {
  const { chartData, setChartData } = useContext(LoginContext);
  const [data, setData] = useState([{}]);
  useEffect(() => {
    axios_.get("http://localhost:5000/members").then((res) => {
      //  console.log(res);
      setChartData(res.data);
      console.log(res.data);
    });
  }, []);

  return <div>{console.log("CONTEXT", chartData)}</div>;
}

export default StockChart;
