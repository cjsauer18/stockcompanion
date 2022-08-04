import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//if the notificaiton is activated, background is green. If not activatred, it is white
//if the notivaion is ACTIVE, the background is higher shade of green, if inactive, it is shaded gray.

function NotificationTile(props) {
  const [alert, setAlert] = useState(props);
  const [isActive, setIsActive] = useState([1, 0]);
  // const [alerts, setAlerts] = useState(props.parent_handle);

  const handleRemoveAlert = () => {
    for (let i = 0; i < alert.length - 1; i++) {
      if (alert[i].id === alert.id) {
        console.log("[NOTIFICATION TILE]: removing notification ID:", alert.id);
        setAlert(...alert.splice(i)); //can assume that the moment this updates, this ocmponent will collapse.
      }
    }
  };

  const toggleActive = (mode) => {
    if (alert.isActive) {
      if (mode === 1) {
        return;
      } else {
        alert.isActive = false;
      }
    }
  };

  console.log("my alert", alert);
  return (
    <Card style={{ width: "30rem", height: "10%" }}>
      <Card.Body>
        <Card.Title>{alert.name}</Card.Title>
        <Card.Text>hi</Card.Text>
        <div className="status-indicator"></div>

        <Button onClick={() => toggleActive()}>Activate</Button>
        <Button onClick={() => toggleActive()}>Deactivate</Button>
        <Button onClick={() => handleRemoveAlert()}>Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default NotificationTile;
