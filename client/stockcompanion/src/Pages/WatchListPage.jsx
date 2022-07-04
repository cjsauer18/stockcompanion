import React, { Component } from "react";
import "./WatchListPage.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import WatchList from "../Components/WatchList";

const WatchListPage = () => {
  return (
    <div className="watchlist-page">
      <WatchList />
    </div>
  );
};

export default WatchListPage;
