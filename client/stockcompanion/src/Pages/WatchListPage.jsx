import React, { Component } from "react";
import "./WatchListPage.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import WatchList from "../Components/WatchList";

class WatchListPage extends Component {
  state = {};

  render() {
    return (
      <div className="data">
        <WatchList />
      </div>
    );
  }
}

export default WatchListPage;
