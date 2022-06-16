import React, { useState } from "react";
import WatchListItem from "./WatchListItem";
import "./WatchList.css";

function WatchList(props) {
  const [data, setData] = useState(""); //api call?
  const [active, setActive] = useState("watch-list-item-unselected");
  function toggleActive(toggle) {
    if (toggle === "watch-list-item-unselected") {
      setActive("watch-list-item-selected");
    }
  }
  return (
    <div className="watch-list-container">
      <WatchListItem toggleOn="watch-list-item-unselected" />
      <WatchListItem toggleOn="watch-list-item-unselected" />
      <WatchListItem toggleOn="watch-list-item-unselected" />
      <WatchListItem toggleOn="watch-list-item-unselected" />
    </div>
  );
}

export default WatchList;

// return (
//     <div>
//       {data.map(() => {
//         return <WatchListItem />;
//       })}
//     </div>
//   );