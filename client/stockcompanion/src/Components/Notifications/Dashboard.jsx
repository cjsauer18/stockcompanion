import React, { useState, useEffect } from "react";
import { formatData } from "../../utility/loadChartData";
import UnderscoreSpring from "./UnderscoreSpring";
import "./Dashboard.css";
//this will display notification alerts as they appear generated from notification.jsx

//TAKES in ALERTS, so it stays updated. Parent rerender triggers a rerender for this.
//If relying on local storage, we could have to constantly check whetehr an alert's values were updated upon an fulfilled promise return. So, that means a set timer that pulls local storage.

function Dashboard({ alerts, handleAlertUpdate }) {
  //it uses a list that it recieves as a prop.
  const [state, setState] = useState([]); //handles the state of what is presented.

  //var alerts = JSON.parse(localStorage.getItem("alerts")) || [];

  useEffect(() => {
    const alertHistory =
      JSON.parse(localStorage.getItem("alert_history")) || [];
    console.log("wee");
    setState(alertHistory);
  }, []);

  const fetchPrice = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const formattedData = formatData(data);
    //   console.log("lets see..", formattedData[0].y[0]);
    return Math.floor(formattedData[0].y[0]);
  };
  //   useEffect(() => {
  //     console.log("heres my copy, oops just rerendered", alerts);
  //   }, []);

  //et timer1 = setTimeout(() => setShow(true), delay * 1000);

  // this will clear Timeout
  // when component unmount like in willComponentUnmount
  //   // and show will not change to true
  //   return () => {
  //     clearTimeout(timer1);
  //   };
  //useEffect(() => {
  let timer = setInterval(async () => {
    // console.log("reffeshing alerts list", alerts);
    for (let i = 0; i < alerts.length; ++i) {
      //interval is in miliseconds. Start tiem in UNIX time.
      // console.log("spinning", alerts[i]);
      if (alerts[i].isActive) {
        //  console.log("active", alerts[i]);

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

          const currentPrice = await fetchPrice(alerts[i].url);
          const percentChange =
            ((alerts[i].startPrice - currentPrice) / alerts[i].startPrice) *
            100;
          console.log(
            "Start Price | End Price | Percent Change: ",
            alerts[i].startPrice,
            currentPrice,
            percentChange
          );
          console.log("[FIRING]", alerts[i].name, alerts[i].interval);

          //will be just above greater than or equal to. that is incurred from the set interval timer.
          const fireAlert = {
            name: alerts[i].name,
            interval: alerts[i].interval,
            currentTime: Math.floor(Date.now() / 1000),
            percentChange: percentChange,
          };
          setState(new Array(...state, fireAlert));
          await handleAlertUpdate(alerts[i]);
          //dont want to re render component. Just check to see if the alert was handled accordingly.
          console.log("UPDATED PRICE, UPDATED START TIME", alerts[i]);

          //  localStorage.setItem("alerts", JSON.stringify(alerts)); //keeps the alert state updated. However, is this
          localStorage.setItem("alert_history", JSON.stringify(state)); //update for notification refrence? For full circle?
        }
      }
    }
  }, 1000);
  //  return clearInterval(timer);
  //});
  //I need to have this dashboard take care of alerts and running them through the clock. All it does is it measures the start and end time differences. I cant have a set interval timer in an object that im stringifying. So, I wil;
  //ill just analyze the time from date.now() compared to the start time and if the difference matches the interval. If so, add a alert component(frame) to state, and render that out, saving it in local storage.

  //go through each alert in alerts (container). If an alert is active, append to a contrainer that has existing notifications.

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
