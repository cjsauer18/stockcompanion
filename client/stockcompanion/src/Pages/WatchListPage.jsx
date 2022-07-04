import React, { useState } from "react";
import "./WatchListPage.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import WatchList from "../Components/WatchList";

const WatchListPage = () => {
  const [watchListData, setWatchListData] = useState("");
  return (
    <div className="watchlist-page">
      <WatchList />
    </div>
  );
};

export default WatchListPage;
