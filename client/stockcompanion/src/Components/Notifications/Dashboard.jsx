import React, { useState, useEffect } from "react";
import { formatData } from "../../utility/loadChartData";
import UnderscoreSpring from "./UnderscoreSpring";
import Button from "react-bootstrap/Button";

import {
  BsChevronDoubleRight,
  BsBookmarkPlusFill,
  BsBookmarkMinusFill,
} from "react-icons/bs";

import "./Dashboard.css";

function contains(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (obj.interval === list[i].interval && obj.name === list[i].name) {
      return i;
    }
  }
  return -1;
}
//This component relies on alerts retreived and parsed from local storage. It reads the current set alerts handled and configured within notifications, and makes the appropriate calculations.
function Dashboard() {
  const [state, setState] = useState([]); //handles the state of what is presented.

  // useEffect(() => {
  //   const alert = [
  //     {
  //       stock: "L",
  //       interval: 60,
  //       desc: "1 min",
  //       isActive: true,
  //       id: 0,
  //       startPrice: 58,
  //       startTime: 1660318973,
  //     },
  //     {
  //       stock: "L",
  //       interval: 60,
  //       desc: "1 min",
  //       isActive: true,
  //       id: 0,
  //       startPrice: 58,
  //       startTime: 1660318973,
  //     },
  //     {
  //       stock: "L",
  //       interval: 60,
  //       desc: "1 min",
  //       isActive: true,
  //       id: 0,
  //       startPrice: 58,
  //       startTime: 1660318973,
  //     },
  //     {
  //       stock: "L",
  //       interval: 60,
  //       desc: "1 min",
  //       isActive: true,
  //       id: 0,
  //       startPrice: 58,
  //       startTime: 1660318973,
  //     },
  //   ];
  //   localStorage.setItem("alert_history", JSON.stringify(alert));
  //   console.log("rerendering dashboard");
  //   setState(alert);
  // }, []);

  useEffect(() => {
    const alertHistory =
      JSON.parse(localStorage.getItem("alert_history")) || [];
    console.log("rerendering dashboard");
    setState(alertHistory);
  }, []);

  const handleBookmark = (alert) => {
    if (alert.bookmarked === true) alert.bookmarked = false;
    else if (alert.bookmarked === false) {
      alert.bookmarked = true;
    }
    console.log("alert", alert);
    console.log(state);
  };
  const handleClearDashboard = () => {
    const newState = [];
    for (let i = 0; i < state.length; ++i) {
      if (state[i].bookmarked === true) {
        newState.push(state[i]);
      }
    }
    localStorage.setItem("alert_history", JSON.stringify(newState));
    setState(newState);
  };

  const handleClear = (alert) => {
    const newState = state.splice(alert, 1);
    setState(newState);
    localStorage.setItem("alert_history", JSON.stringify(newState));
  };
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
              bookmarked: false,
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
            const newState = new Array(...state);

            if (state.length !== 0) {
              const index = contains(fireAlert, newState);
              if (index === -1) {
                newState.push(fireAlert);
              } else {
                newState[index] = fireAlert;
              }
            } else {
              newState.push(fireAlert);
            }
            localStorage.setItem("alert_history", JSON.stringify(newState));
            console.log("Updated State", newState); //update for notification refrence? For full circle?
            setState(newState);
          }
        }
      }
    }, 1000);
    //return timer;
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        {state.length !== 0 ? (
          state.map((alert, i) => {
            return (
              <div key={i} className="alert-container">
                <li className="col-1">{alert.name}</li>
                <li className="col-1">{alert.interval}</li>
                <li className="col-2">
                  <BsChevronDoubleRight size={30} />
                  <h3>{alert.percentChange}%</h3>
                </li>
                <Button
                  onClick={() => handleClear(alert)}
                  className="alert-clear"
                >
                  Clear
                </Button>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>

      <UnderscoreSpring />
      <button
        className="clear-all"
        onClick={() => {
          handleClearDashboard();
        }}
      >
        Clear dashboard
      </button>
    </div>
  );
}

export default Dashboard;
