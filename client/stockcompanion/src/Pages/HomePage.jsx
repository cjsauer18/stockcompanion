//import ApexChart from "../Chart/ApexChart.jsx";
//import Apps from "./new_chart";

import React, { useContext, useState, Fragment } from "react";
import Notification from "../Components/Notifications/Notification";
import { StockContext } from "../Contexts/StockContext";
//import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import Stock from "../Components/stock";
import TickerSearch from "../Components/TickerSearch/TickerSearch";
import Chart from "../Components/Chart/Chart";
//have a handleButton function that takes as input the start range for the graph.
//it takes the stock obect and calls .setStart() which is set as the context again.

//this component is a subcomponent (child component) of the app.jsx component. It has a context provided in app.jsx, which is passed down to any child component coantined within it. This class is one of them.
//Any component contained in here can access the context provided in app through the useContext hook. This is similar to passing as props: <Component prop = {thing}/>. useContext is emmulating this functionality.

//https://github.com/tedchou12/webull/blob/master/webull/webull.py webulls api that allows us to grab some cool data like news posts

function HomePage() {
  //I want to avoid a state refresh for this home page. Do I avoid any set state functionality?
  //localStorage.setItem("ACTIVE_TICKER", JSON.stringify("TSLA"));

  // a set interal, to retreieve a stock.

  // setInterval(() => {
  //   var active_ticker = JSON.parse(localStorage.getItem("ACTIVE_TICKER"));
  //   if (currentStockTicker !== active_ticker) {
  //   }
  //   if (!stockMap.has(active_ticker)) {
  //     stockMap.set(active_ticker, new Stock(active_ticker));
  //     console.log("[STOCK MAP]:", stockMap);
  //     localStorage.setItem(JSON.stringify(stockMap));
  //   } else {
  //   }
  // }, 1000);

  // useEffect(() => {
  //   var stockList = JSON.parse(localStorage.getItem("stockList")) || [];
  //   const indexOfTicker = stockList.indexOf(active_ticker);
  // }, []);

  // useEffect(() => {

  //   var tickersWatchList =
  //     JSON.parse(localStorage.getItem("tickersWatchList")) || [];
  //   const indexOfTicker = tickersWatchList.indexOf(active_ticker);
  //   if (indexOfTicker !== -1) {
  //     setIsInWatchList(true);
  //   }
  // }, []);

  //I can use this code in a stock list functionality, and for existing alers.

  return (
    <Fragment>
      <div className="home-page">
        <TickerSearch />

        <Chart />

        {/* <button className="btn btn-secondary">Set Notification</button> */}
        <Notification />
        {/* MAKESHIFT passing in the function to change the state of the parent component as notification settings are stored here BUT COULD BE STORED IN A SERVER AS DATA!!!!!!  */}
        {/* removing and adding notifications for specific stocks are handled in the same component: <Notification/>  */}
      </div>
    </Fragment>
  );
}

export default HomePage;
