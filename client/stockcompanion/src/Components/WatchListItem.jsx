import React, { useState } from "react";

function WatchListItem(props) {
  //if the current page is rendering this component, chagne the classname.

  return (
    <ul className={props.toggleOn}>
      <button>remove</button>
      <li>
        <div className="number-box">number</div>
      </li>
      <li>
        <div className="ticker-box">ticker</div>
      </li>
      <li>
        <div className="price-box">price</div>
      </li>
      <li>
        <div className="after-hours">afterhours</div>
      </li>
      <li>
        <div className="change-box">change</div>
      </li>
      <li>
        <div className="change-box">percent change</div>
      </li>
      <li>
        <div className="change-box">open</div>
      </li>
      <li>
        <div className="change-box">previousClose</div>
      </li>
      <li>
        <div className="change-box">high</div>
      </li>
      <li>
        <div className="change-box">low</div>
      </li>
      <li>
        <div className="change-box">average vol</div>
      </li>
      <li>
        <div className="change-box">market cap</div>
      </li>
    </ul>
  );
}

export default WatchListItem;
