import React, { useState, useEffect } from "react";

//this will display notification alerts as they appear generated from notification.jsx

//dashboard will be a UI container that contains tiles of reports as they are generated. This board does not reset when a stock is switched.

function Dashboard(props) {
  const alerts = props; //it uses a list that it recieves as a prop.
  const [state, setState] = useState([]); //handles the state of what is presented.

  //if presumption is correct: the state will update, but the props it recieves still has everything we need to mark down. The state never is lost in context, ebcause we set the next state with itself.

  //CONSIDER LOCAL STORAGE OPTION FOR HISTORY KEEPING.

  useEffect();
  {
    setTimeout(() => {
      for (let i = 0; i < alerts.length; ++i) {
        if (alerts[i].isActive && alerts[i].ALARM === true) {
          //figure out outlet
          //if alerts[i].1minute === true /// do ...
          const fireAlert = {
            name: alerts[i].name,
            type: alerts[i].type,
            interval: alerts[i].interval,
            currentTime: Date.now() / 1000,
            percentageChange: alerts[i].percentageChange,
          };
          setState(new Array(...state, fireAlert));
          alerts[i].resetAlarm();
        }
      }
    }, 1000);
    //go through each alert in alerts (container). If an alert is active, append to a contrainer that has existing notifications.
  }

  return (
    <div>
      {state.length > 0 ? (
        state.map((alert, i) => {
          <div key={i} className="alert-container">
            <h1>{alert.stock}</h1> <h1>{alert.type}</h1>{" "}
            <h1> {alert.interval}</h1> <h1>{alert.value}</h1>
          </div>;
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Dashboard;
