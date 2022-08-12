import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";

//if the notificaiton is activated, background is green. If not activatred, it is white
//if the notivaion is ACTIVE, the background is higher shade of green, if inactive, it is shaded gray.

// (1) display the notification title.
// (2) show up on screen. (run the calculations)

function NotificationTile({ isActive, toggleActive, alert, handleDelete }) {
  // const [alert, setAlert] = useState(alert);

  return (
    <Card
      className={
        isActive ? "notification-tile-active" : "notification-tile-inactive"
      }
      style={{ width: "30rem", height: "10%" }}
    >
      <Card.Body>
        <Card.Title>{alert.stock}</Card.Title>
        <Card.Text>{alert.desc}</Card.Text>
        <div className="status-indicator"></div>

        <Button onClick={() => toggleActive(alert)}>Toggle</Button>
        <Button onClick={() => handleDelete(alert)}>Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default NotificationTile;
