import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//if the notificaiton is activated, background is green. If not activatred, it is white
//if the notivaion is ACTIVE, the background is higher shade of green, if inactive, it is shaded gray.

function NotificationTile(props) {
  return (
    <Card style={{ width: "30rem", height: "10%" }}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <div className="status-indicator"></div>
        {/* <Button variant="primary" >onClick={() => handleRemoveCard()}> */}
        <Button>Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default NotificationTile;
