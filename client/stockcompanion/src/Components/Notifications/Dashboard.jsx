import React, { useState, useEffect } from "react";
import { formatData } from "../../utility/loadChartData";
import UnderscoreSpring from "./UnderscoreSpring";
import "./Dashboard.css";

//This component relies on alerts retreived and parsed from local storage. It reads the current set alerts handled and configured within notifications, and makes the appropriate calculations.

function Dashboard() {
  const [state, setState] = useState([]); //handles the state of what is presented.

  useEffect(() => {
    const alertHistory =
      JSON.parse(localStorage.getItem("alert_history")) || [];
    console.log("rerendering dashboard");
    setState(alertHistory);
  }, []);

  //This interval may be off for weekends, or after 5PM EST when the stock market closes. Should implement a check for this to bypass any redundant fetching.
  const fetchPrice = async (stock) => {
    const url = `http://localhost:5000/members?ticker=${stock}&start=${Math.floor(
      Date.now() / 1000
    )}&end=${Math.floor(Date.now() / 1000)}&interval=1m&range=5m`;
    const response = await fetch(url);
    const data = await response.json();
    const formattedData = formatData(data);

    return Math.floor(formattedData[formattedData.length - 1].y[0]);
  };

  useEffect(() => {
    let timer = setInterval(async () => {
      const alerts = JSON.parse(localStorage.getItem("alerts")) || []; //ensures we have the most updated data. Doesnt rely on state change (cant rely on state change because we odnt have complete control over that)

      for (let i = 0; i < alerts.length; ++i) {
        if (alerts[i].isActive) {
          console.log(
            "[checking interval] Interval sought:",
            alerts[i].interval,
            "start Time",
            alerts[i].startTime,
            "current time frame:",
            Math.abs(alerts[i].startTime - Math.floor(Date.now() / 1000))
          );
          if (
            alerts[i].interval <=
            Math.abs(alerts[i].startTime - Math.floor(Date.now() / 1000))
          ) {
            //adjust start time for reset.

            const currentPrice = await fetchPrice(alerts[i].stock);
            const percentChange =
              ((alerts[i].startPrice - currentPrice) / alerts[i].startPrice) *
              100;
            console.log(
              "Start Price | End Price | Percent Change: ",
              alerts[i].startPrice,
              currentPrice,
              percentChange
            );
            console.log("[FIRING]", alerts[i].stock, alerts[i].interval);

            const fireAlert = {
              name: alerts[i].stock,
              interval: alerts[i].interval,
              currentTime: Math.floor(Date.now() / 1000),
              percentChange: percentChange,
            };

            alerts[i].startTime = Math.floor(Date.now() / 1000); //this might call a rerender for notifications, ebcau
            alerts[i].startPrice = await fetchPrice(alerts[i].stock);
            localStorage.setItem("alerts", JSON.stringify(alerts)); //update alerts in local storage for immediate reference.

            console.log("UPDATED PRICE, UPDATED START TIME", alerts[i]);
            console.log(
              "updating dashboard state. PREV",
              state,
              "Add:",
              fireAlert
            );
            const newState = new Array(...state, fireAlert);
            setState(newState);

            localStorage.setItem("alert_history", JSON.stringify(state)); //update for notification refrence? For full circle?
          }
        }
      }
    }, 1000);
    //return timer;
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        {state.length > 0 ? (
          state.map((alert, i) => {
            <div key={i} className="alert-container">
              <h1>{alert.name}</h1> <h1> {alert.interval}</h1>
              <h1>{alert.value}</h1>
            </div>;
          })
        ) : (
          <div></div>
        )}
        <UnderscoreSpring />
      </div>
    </div>
  );
}

export default Dashboard;
