import "./styles.css";
import React, { useEffect, useState } from "react";
import WatchListPage from "./Pages/WatchListPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Nav from "./Components/Nav.jsx";
// import your route components too

function App() {
  return (
    <div className="App">
      <div className="main-container">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/WatchListPage" element={<WatchListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;
