import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

const axios_ = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

function getData() {}

//stock data is a javascript object
function fetchData(stockData) {
  let Data = {};
  useEffect(() => {
    const url = `http://localhost:5000/members?ticker=${stockData.name}&start=${stockData.start}&end=${stockData.end}`;
    console.log("URL: ", url);
    axios_.get(url).then((res) => {
      // setChartData(res.data);
      console.log(res.data);
      Data = res.data;
    });
  }, []);
  return Data;
}

function retreiveDataFromDatabase() {}
