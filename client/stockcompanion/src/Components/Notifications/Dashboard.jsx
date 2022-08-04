import React, { useState, useEffect } from "react";
import { formatData } from "../../utility/loadChartData";

//this will display notification alerts as they appear generated from notification.jsx

//dashboard will be a UI container that contains tiles of reports as they are generated. This board does not reset when a stock is switched.

function Dashboard() {
  //it uses a list that it recieves as a prop.
  const [state, setState] = useState([]); //handles the state of what is presented.

  //if presumption is correct: the state will update, but the props it recieves still has everything we need to mark down. The state never is lost in context, ebcause we set the next state with itself.
  var alerts = JSON.parse(localStorage.getItem("alerts")) || [];
  useEffect = () => {
    //if state.length === 0, then parse
    //this will rerender when my notification updates on the dom.Forces useeffect.

    var alerts = JSON.parse(localStorage.getItem("alerts")) || [];
    setState(alerts);
  };

  const fetchPrice = async (url) => {
    const response = await fetch(url);
    const data = await formatData(response.json());
    return data;
  };

  setInterval(() => {
    for (let i = 0; i < alerts.length; ++i) {
      //interval is in miliseconds. Start tiem in UNIX time.
      if (alerts[i].isActive) {
        if (
          alerts[i].interval <=
          Math.abs(alerts[i].startTime - Date.now() / 1000)
        ) {
          alerts[i].startTime = Date.now() / 1000;
          const currentPrice = fetchPrice(alerts[i].url);
          const percentageChange =
            (alerts[i].startPrice - currentPrice) / alerts[i].startPrice;

          console.log("[FIRING]", alerts[i].name, alerts[i].interval);

          //will be just above greater than or equal to. that is incurred from the set interval timer.
          const fireAlert = {
            name: alerts[i].name,
            interval: alerts[i].interval,
            currentTime: Date.now() / 1000,
            percentageChange: percentageChange,
          };

          setState(new Array(...state, fireAlert));
        }
      }
    }
  }, 1000);
  //I need to have this dashboard take care of alerts and running them through the clock. All it does is it measures the start and end time differences. I cant have a set interval timer in an object that im stringifying. So, I wil;
  //ill just analyze the time from date.now() compared to the start time and if the difference matches the interval. If so, add a alert component(frame) to state, and render that out, saving it in local storage.

  //go through each alert in alerts (container). If an alert is active, append to a contrainer that has existing notifications.

  return (
    <div>
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
    </div>
  );
}

export default Dashboard;
