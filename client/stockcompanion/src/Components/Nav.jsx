<<<<<<< HEAD
import React, { useState } from "react";
import "./Nav.css";

=======
import "../styles.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> master

// import your route components too

//if the button is active, then we should have the button region be lit up

function Nav() {
<<<<<<< HEAD
  
=======
  const [active, setActive] = useState(["active-link", "non-active-link"]);
  //if the current page is rendering this component, chagne the classname.

  function toggleClass(buttonCount) {
    if (buttonCount == 2) {
      if (active[1] !== "active-link") {
        setActive(["non-active-link", "active-link"]);
      }
    } else if (buttonCount == 1) {
      if (active[0] !== "active-link") {
        setActive(["active-link", "non-active-link"]);
      }
    }
  }

>>>>>>> master
  return (
    <div className="nav">
      <div className="topbar">
        <button className="alert-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
<<<<<<< HEAD
            className="bi bi-bell-fill"
=======
            class="bi bi-bell-fill"
>>>>>>> master
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
        </button>
      </div>
<<<<<<< HEAD
=======
      <div className="sidebar">
        <li className={active[0]}>
          <Link to="/" onClick={() => toggleClass(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-bar-chart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
            </svg>
          </Link>
        </li>
        <li className={active[1]}>
          <Link to="WatchListPage" onClick={() => toggleClass(2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-bookmark-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
            </svg>
          </Link>
        </li>
      </div>
>>>>>>> master
    </div>
  );
}
export default Nav;

//cards can be used for modularized compact ui element
//forms used for submittion portal (STOCK LOOKUP)

//need to figure out what I need for database in terms of remembering the metadata of this app
