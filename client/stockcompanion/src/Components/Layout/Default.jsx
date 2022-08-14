import React, { Fragment } from "react";
import Sidebar from "../Header/Sidebar";
import Nav from "../Nav";
import "./Default.css";

const Default = (props) => {
  return (
    <Fragment>
      {/* <div>
        <Sidebar />
      </div> */}
      <div className="container">{props.children}</div>
    </Fragment>
  );
};

export default Default;
