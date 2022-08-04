import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./Notification.css";
import NotificationTile from "./NotificationTile";
import Form from "react-bootstrap/Form";
import { BiSearch } from "react-icons/bi";
import Alert from "./Alert";

import { sleep } from "../../utility/util";
import Dashboard from "./Dashboard";

//I want to be notified when the price changes a set percentage point.
//I want to be notificed when the volume changes after a set percentage point.

//track price percentage change every 1 minute, 5 minute, 30 minute, 1 hour. Suite of buttons.

//I can maintain a state that I just send down into the dsashboard component. Or I can manage a list in local storage? To reference constanly in a set interval fashion in the local component? No. Because state wont update that way (SetState inside setTimeout DOESN OT WORK).

function contains(obj, alerts) {
  var i;
  for (i = 0; i < alerts.length; i++) {
    console.log(
      "COMPARE",
      obj.name,
      alerts[i].name,
      obj.interval,
      alerts[i].interval
    );
    if (obj.name === alerts[i].name && obj.interval === alerts[i].interval) {
      return true;
    }
  }
  return false;
}

function Notification(props) {
  const [alertContainer, setAlertContainer] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [interval, setInterval] = useState("1 min");
  const [intervalButtonActive, setIntervalButtonActive] = useState([]);

  useEffect(() => {
    //rerender existing notifications that were set back into state from local storage.
    setAlerts(JSON.parse(localStorage.getItem("alerts")));
    const currentStock = localStorage.getItem("ACTIVE_TICKER");
  });

  //CREATE a stock checking mechanism from local storage
  setTimeout(() => {
    const currentStock = localStorage.getItem("ACTIVE_TICKER");
  }, 1000);

  const handleSetNotification = (currentStock, interval) => {
    console.log("here");
    const newAlert = new Alert(currentStock, interval);
    console.log("alert created");

    //WHAT HAPPENS IF A STOCK HAS 2 INTERVALS SET. THE ALERT OBJECT SHOULD CONTAIN MULTIPLE OUTLETS THAT FIRE. CANT MAKE MULTIPLE OBJECTS THAT SPAM THE API CALL.

    if (alerts.length === 0) {
      setAlerts([newAlert]);
      console.log("new alert state", alert);
    } else if (!contains(newAlert, alerts)) {
      setAlerts(new Array(...alerts, newAlert));
      localStorage.setItem("alerts", JSON.stringify(Alerts));
    } else {
      console.log("Alert already in set");
    }
  };

  const intervals = [
    {
      name: "1 min",
    },
    {
      name: "5 min",
    },
    {
      name: "10 min",
    },
    {
      name: "30 min",
    },
    {
      name: "1 hr",
    },
  ];

  return (
    <div>
      <div>
        {/* <Dashboard alerts={alerts} />  this can probably stay here. This can also use lcoal storage as it's save space if needed */}
        <Form className="interval-change-form">
          {intervals.map((interval, i) => {
            return (
              <Button
                key={i}
                onClick={() => setInterval(interval)}
                className="interval-btn"
              >
                {interval.name}
              </Button>
            );
          })}
          <Button
            className="set-notification"
            onClick={() => handleSetNotification(currentStock, interval)}
          >
            Set Notification
          </Button>
        </Form>

        <div className="active-notification-pannel">
          {alerts.length === 0 ? (
            <div>No notifications set</div>
          ) : (
            alerts.map((alert, i) => (
              <NotificationTile
                key={i}
                container={alert}
                parent_handle={setAlerts}
              />
              // <button></button> toggle active, maybe remove button here
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
