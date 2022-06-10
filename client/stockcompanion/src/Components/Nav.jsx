import "../styles.css";
import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

// import your route components too

function Nav() {
  return (
    <div>
      <div className="topbar">
        <a href="#">Alerts</a>
      </div>
      <div className="sidebar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="WatchListPage">Watch List</Link>
        </li>
      </div>
    </div>
  );
}
export default Nav;

//cards can be used for modularized compact ui element
//forms used for submittion portal (STOCK LOOKUP)

//need to figure out what I need for database in terms of remembering the metadata of this app
