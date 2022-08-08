import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./Notification.css";
import NotificationTile from "./NotificationTile";
import Form from "react-bootstrap/Form";
import { formatData } from "../../utility/loadChartData";
import Dashboard from "./Dashboard";

//This component tracks the price percentage change every 1 minute, 5 minute, 30 minute, 1 hour through use of a suite of interval buttons.

//Helper function, compares alerts to a newly created alert to ensure we dont have duplicate alerts.
function contains(obj, alerts) {
  var i;
  for (i = 0; i < alerts.length; i++) {
    if (obj.stock === alerts[i].stock && obj.interval === alerts[i].interval) {
      return true;
    }
  }
  return false;
}

function Notification(props) {
  const [alerts, setAlerts] = useState([]);
  const [interval, setInterval] = useState(false);

  useEffect(() => {
    //fetches the most recent alerts to load back into state.
    const alerts = JSON.parse(localStorage.getItem("alerts")) || [];
    setAlerts(alerts);
  }, []);

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

  const toggleActive = async (alert) => {
    if (alert.isActive) {
      alert.isActive = false;
    } else if (!alert.isActive) {
      alert.isActive = true;
      alert.startTime = Math.floor(Date.now() / 1000);
      console.log("here");
      //assures the toggled alert has the most recent data.
      alert.startPrice = await fetchPrice(
        `http://localhost:5000/members?ticker=${alert.stock}&start=${Math.floor(
          Date.now() / 1000
        )}&end=${Math.floor(Date.now() / 1000)}&interval=1m&range=5m`
      );
    }
    const newState = new Array(...alerts);
    setAlerts(newState);
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

  //This function handles the set notification functuoanlity. It retrieves the current stock ticker that the user has loaded up, and
  //creates an alert in state. The alert can be toggled through the notification tile component where it has passed down function handles to the child component (tile)
  //to toggle active or remove the alert. The alert is handled in the dashboard component.

  const handleSetNotification = (interval) => {
    const currentStock = localStorage.getItem("ACTIVE_TICKER") || "";

    //console.log(interval);
    if (!interval) {
      return;
    }
    if (currentStock === "") return;

    const newAlert = {
      stock: currentStock,
      interval: interval.interval,
      desc: interval.name,
      isActive: false,
      id: alerts.length,
      startPrice: "",
      startTime: Date.now() / 1000,
    };

    if (alerts.length === 0) {
      const newAlerts = new Array(newAlert);
      setAlerts(newAlerts);
      localStorage.setItem("alerts", JSON.stringify(newAlerts)); //this does not return in time when the price has fetched.
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
        <Dashboard />
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
