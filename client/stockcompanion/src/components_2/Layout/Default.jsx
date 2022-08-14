import React from "react";
import Sidebar from "../Header/Sidebar";
import Nav from "../Nav";
import "./Default.css";

const Default = (props) => {
  return (
    <div className="main-container">
      <Nav />
      <div>
        <div>
          {" "}
          <Sidebar />{" "}
        </div>
        <div className="container main-content">{props.children}</div>
      </div>
    </div>
  );
};

export default Default;
