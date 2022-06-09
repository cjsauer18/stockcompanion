import "./styles.css";
import React from "react";
import WatchListPage from "./Pages/WatchListPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Nav from "./Nav.jsx";
// import your route components too

function App() {
  return (
    (
      <div className="App">
        <h1> Stock Companion App</h1>
      </div>
    ),
    (
      <div>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/WatchListPage" element={<WatchListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  );
}
export default App;
