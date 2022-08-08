import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./Notification.css";
import NotificationTile from "./NotificationTile";
import Form from "react-bootstrap/Form";
import { BiSearch } from "react-icons/bi";
import Alert from "./Alert";
import { formatData, getTop } from "../../utility/loadChartData";

import { sleep } from "../../utility/util";
import Dashboard from "./Dashboard";
//I want to be notified when the price changes a set percentage point.
//I want to be notificed when the volume changes after a set percentage point.

//track price percentage change every 1 minute, 5 minute, 30 minute, 1 hour. Suite of buttons.

//I can maintain a state that I just send down into the dsashboard component. Or I can manage a list in local storage? To reference constanly in a set interval fashion in the local component? No. Because state wont update that way (SetState inside setTimeout DOESN OT WORK).

function contains(obj, alerts) {
  var i;
  for (i = 0; i < alerts.length; i++) {
    // console.log(
    //   "COMPARE",
    //   obj.name,
    //   alerts[i].name,
    //   obj.interval,
    //   alerts[i].interval
    // );
    if (obj.name === alerts[i].name && obj.interval === alerts[i].interval) {
      return true;
    }
  }
  return false;
}

//account for active swtich in TILE co mponent. Maybe have a constatn interval timer save the state of the noticifcations in local storage?

function Notification(props) {
  const [alertContainer, setAlertContainer] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [interval, setInterval] = useState(false);
  const [intervalButtonActive, setIntervalButtonActive] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const alerts = JSON.parse(localStorage.getItem("alerts")) || [];
    setAlerts(alerts);
  }, []);

  // to update the local storage once the fetch returns with start price data.
  // useEffect(() => {
  //   console.log("did alert change?", alerts);
  //   setIsLoading(false); //assuming this rerenders for dashboard
  //   localStorage.setItem("alerts", JSON.stringify(alerts));
  // }, [isLoading]);

  // const currentStock =
  //   JSON.parse(localStorage.getItem("ACTIVE_TICKER")) || "TSLA";
  const currentStock = "TSLA";
  const handleDelete = (alert) => {
    const index = alerts.indexOf(alert);
    if (alerts.length === 1) {
      setAlerts([]);
      localStorage.removeItem("alerts");
    } else {
      const newAlerts = new Array(...alerts);
      newAlerts.splice(index, 1);
      setAlerts(newAlerts);
      localStorage.setItem("alerts", JSON.stringify(newAlerts));
    }
  };

  const handleAlertUpdate = async (alert) => {
    alert.startTime = Math.floor(Date.now() / 1000); //this might call a rerender for notifications, ebcau
    alert.startPrice = await fetchPrice(
      `http://localhost:5000/members?ticker=${alert.stock}&start=${Math.floor(
        Date.now() / 1000
      )}&end=${Math.floor(Date.now() / 1000)}&interval=1m&range=1m`
    );
    console.log("check out my new sick alerts", alerts);
    // setAlerts(new Array(...alerts)); //forces a state update. This wont be good. Because the set interval loses its index.
  };

  const toggleActive = async (alert) => {
    if (alert.isActive) {
      alert.isActive = false;
    } else if (!alert.isActive) {
      alert.isActive = true;
      alert.startTime = Math.floor(Date.now() / 1000);

      //assures the toggled alert has the most recent data.
      alert.startPrice = await fetchPrice(
        `http://localhost:5000/members?ticker=${alert.stock}&start=${Math.floor(
          Date.now() / 1000
        )}&end=${Math.floor(Date.now() / 1000)}&interval=1m&range=5m`
      );
    }
    setAlerts(new Array(...alerts));
    localStorage.setItem("alerts", JSON.stringify(alerts));
  };

  const fetchPrice = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const formattedData = formatData(data);
    //setIsLoading(true);
    //   console.log("lets see..", formattedData[0].y[0]);
    //setIsLoadingFetch(true)
    console.log("lets see..", formattedData);

    return Math.floor(formattedData[formattedData.length - 1].y[0]);
  };

  //market is not open on this day. If the returned date is on the weekend.
  const handleSetNotification = (interval) => {
    console.log(interval);
    if (!interval) {
      return;
    }
    const currentStock = localStorage.getItem("ACTIVE_TICKER");
    // const currentStock = "TSLA";

    const newAlert = {
      stock: currentStock,
      interval: interval.interval,
      desc: interval.name,
      isActive: false,
      url: `http://localhost:5000/members?ticker=${currentStock}&start=${Math.floor(
        Date.now() / 1000
      )}&end=${Math.floor(Date.now() / 1000)}&interval=1m&range=1m`,
      id: alerts.length,
      startPrice: "",
      startTime: Date.now() / 1000,
    };
    //console.log("alert created");
    // console.log("fetching the price", newAlert);
    if (alerts.length === 0) {
      const newAlerts = new Array(newAlert);
      setAlerts(newAlerts);
      localStorage.setItem("alerts", JSON.stringify(newAlerts)); //this does not return in time when the price has fetched.

      //console.log("new alert state", alerts);
    } else if (!contains(newAlert, alerts)) {
      const newAlerts = new Array(...alerts);
      newAlerts.push(newAlert);
      setAlerts(newAlerts);
      localStorage.setItem("alerts", JSON.stringify(newAlerts));
    }
  };

  const intervals = [
    {
      name: "1 min",
      interval: 60,
    },
    {
      name: "5 min",
      interval: 300,
    },
    {
      name: "10 min",
      interval: 600,
    },
    {
      name: "30 min",
      interval: 18000,
    },
    {
      name: "1 hr",
      interval: 36000,
    },
  ];

  return (
    <div>
      <div>
        <Dashboard alerts={alerts} handleAlertUpdate={handleAlertUpdate} />
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
                isActive={alert.isActive}
                toggleActive={toggleActive}
                alert={alert}
                handleDelete={handleDelete}
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
