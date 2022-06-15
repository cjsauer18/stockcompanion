import React, { useState } from "react";
import "./WatchListPage.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
//import DatatablePage from "./table.jsx";
import WatchList from "../Components/WatchList";

function WatchListPage() {
  const [data, setData] = useState({});

  return (
    <div>
      <button></button>
      <WatchList />
    </div>
  );
}

export default WatchListPage;
