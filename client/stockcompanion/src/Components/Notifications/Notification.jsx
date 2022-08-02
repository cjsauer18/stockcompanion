import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Notification.css";
import NotificationTile from "./NotificationTile";
import Form from "react-bootstrap/Form";
import { BiSearch } from "react-icons/bi";

//I want to be notified when the price changes a set percentage point.
//I want to be notificed when the volume changes after a set percentage point.

function contains(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (
      list[i].description === obj.description &&
      list[i].title === obj.title &&
      list[i].alertNumber === obj.alertNumber
    ) {
      return true;
    }
  }
  return false;
}

function Notification(props) {
  const [state, setState] = useState([]);
  const [percentageValue, setPercentageValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSetNotification = (value, type, number) => {
    console.log(value, type);
    if (number === " " || number.length != 10) {
      console.log("[NOTIF] invalid alert number.");
      return;
    }
    if (isNaN(number)) {
      console.log("[NOTIF] number entered is not a number");
      return;
    }
    if (isNaN(value)) {
      console.log("[NOTIF] value entered is not a number");
      return;
    }
    const newTile = {
      key: state.length + 1,
      title: `${type} percentage change`,
      description: `alert a percentage change of ${value}`,
      alertNumber: number,
      isActive: false,
      isActivated: true,
    };

    if (state.length === 0) {
      setState([newTile]);
    } else {
      if (!contains(newTile, state)) {
        setState(new Array(...state, newTile));
      } else {
        console.log("Item already in set");
      }
    }
    console.log(state);
  };
  const handlePercentChange = () => {};
  // const intervals = [
  //   {
  //     name: "1 min",
  //   },
  //   {
  //     name: "5 min",
  //   },
  //   {
  //     name: "10 min",
  //   },
  //   {
  //     name: "30 min",
  //   },
  //   {
  //     name: "1 hr",
  //   },
  // ];
  return (
    <div>
      <div>
        <Form className="percentage-change-form">
          <Form.Control
            type="text"
            placeholder="% Change"
            value={percentageValue}
            onChange={(event) => setPercentageValue(event.target.value)}
            className="percentage-change-form-input"
            aria-label="Search"
          />
          <Form.Control
            type="text"
            placeholder="phone number to alert"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            className="alert-number-form-input"
          />
          <Button
            className="set-notification"
            onClick={() =>
              handleSetNotification(percentageValue, "price", phoneNumber)
            }
          >
            Set Notification
          </Button>
        </Form>

        {/* {intervals.map((interval, i) => (
          <span
            className="percent-change"
            onClick={() => {
              handlePercentChange(interval.name.toLocalLowerCase());
            }}
          >
            {interval.name}
          </span> */}
        {/* ))} */}
        <div className="active-notification-pannel">
          {state.length === 0 ? (
            <div>No notifications set</div>
          ) : (
            state.map((notification, i) => (
              <NotificationTile
                title={notification.title}
                description={notification.description}
                // isActive={notification.isActive}
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
