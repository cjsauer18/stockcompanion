import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";

//if the notificaiton is activated, background is green. If not activatred, it is white
//if the notivaion is ACTIVE, the background is higher shade of green, if inactive, it is shaded gray.

function NotificationTile(props) {
  const [alert, setAlert] = useState(props.container);
  const [isActive, setIsActive] = useState(false);
  // const [alerts, setAlerts] = useState(props.parent_handle);

  const handleRemoveAlert = () => {
    for (let i = 0; i < alert.length - 1; i++) {
      if (alert[i].id === alert.id) {
        console.log("[NOTIFICATION TILE]: removing notification ID:", alert.id);
        setAlert(...alert.splice(i)); //can assume that the moment this updates, this ocmponent will collapse.
      }
    }
  };

  //will impact the tile state (coloring adn what not)
  //I assume that the direct reference to alert state propagates upwards as it is recieved by notification component.
  const toggleActive = (mode) => {
    if (alert.isActive) {
      if (mode === 1) return;
      else {
        console.log("making inactive");
        alert.isActive = false;
        setIsActive(false);
      }
    } else if (!alert.isActive) {
      if (mode === 2) return;
      else {
        console.log("making active");
        alert.isActive = true;
        setIsActive(true);
      }
    }
  };

  //console.log("my alert", alert);
  return (
    <Card
      className={
        isActive ? "notification-tile-active" : "notification-tile-inactive"
      }
      style={{ width: "30rem", height: "10%" }}
    >
      <Card.Body>
        <Card.Title>{alert.name}</Card.Title>
        <Card.Text>hi</Card.Text>
        <div className="status-indicator"></div>

        <Button onClick={() => toggleActive(1)}>Activate</Button>
        <Button onClick={() => toggleActive(2)}>Deactivate</Button>
        <Button onClick={() => handleRemoveAlert()}>Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default NotificationTile;
