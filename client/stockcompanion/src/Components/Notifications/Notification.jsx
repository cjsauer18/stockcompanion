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

//account for active swtich in TILE component. Maybe have a constatn interval timer save the state of the noticifcations in local storage?

function Notification(props) {
  const [alertContainer, setAlertContainer] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [interval, setInterval] = useState("1 min");
  const [intervalButtonActive, setIntervalButtonActive] = useState([]);

  // useEffect(() => {
  //   //rerender existing notifications that were set back into state from local storage.
  //   var currentAlerts = JSON.parse(localStorage.getItem("alerts")) || [];
  //   if (currentAlerts !== alerts) {
  //     console.log("mysh", currentAlerts, "current sh", alerts);
  //     setAlerts(currentAlerts);
  //     console.log("[ALERT RERENDER] Alerts State", alerts);
  //   }
  //   const currentStock = localStorage.getItem("ACTIVE_TICKER");
  // });

  const handleSetNotification = (interval) => {
    const currentStock = localStorage.getItem("ACTIVE_TICKER");
    console.log("mycurrentshit:", currentStock);
    const newAlert = new Alert(currentStock, interval);
    console.log("alert created");

    //WHAT HAPPENS IF A STOCK HAS 2 INTERVALS SET. THE ALERT OBJECT SHOULD CONTAIN MULTIPLE OUTLETS THAT FIRE. CANT MAKE MULTIPLE OBJECTS THAT SPAM THE API CALL.

    if (alerts.length === 0) {
      setAlerts([newAlert]);
      console.log("new alert state", alert);
    } else if (!contains(newAlert, alerts)) {
      setAlerts(new Array(...alerts, newAlert));
      localStorage.setItem("alerts", JSON.stringify(alerts));
    } else {
      console.log("Alert already in set");
    }
  };

  const intervals = [
    {
      name: "1 min",
      interval: 6000,
    },
    {
      name: "5 min",
      interval: 30000,
    },
    {
      name: "10 min",
      interval: 60000,
    },
    {
      name: "30 min",
      interval: 1800000,
    },
    {
      name: "1 hr",
      interval: 3600000,
    },
  ];

  return (
    <div>
      <div>
        {/* <Dashboard /> */}
        <Form className="interval-change-form">
          {intervals.map((interval, i) => {
            return (
              <Button
                key={i}
                onClick={() => setInterval(interval.interval)}
                className="interval-btn"
              >
                {interval.name}
              </Button>
            );
          })}
          <Button
            className="set-notification"
            onClick={() => handleSetNotification(interval)}
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
