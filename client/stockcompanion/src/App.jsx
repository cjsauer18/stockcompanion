import "./styles.css";
<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useEffect, useState, useContext } from "react";
import WatchListPage from "./Pages/WatchListPage";
>>>>>>> master
import HomePage from "./Pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
<<<<<<< HEAD
import { StockContext } from "./Contexts/StockContext";
import WatchListPage from "./Pages/WatchListPage";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [stockData, setStockData] = useState("");

  return (
    <StockContext.Provider value={{ stockData, setStockData }}>
      <BrowserRouter>
        {/* <Nav /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/old-home" element={<HomePage />} /> */}
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
    </StockContext.Provider>
=======
import Nav from "./Components/Nav.jsx";
import { StockContext } from "./Contexts/StockContext";
import Chart from "./Chart/Chart";
//import { WatchListContext } from "./Contexts/WatchListContext";
// import your route components too

function App() {
  const [stockData, setStockData] = useState("");
  const [watchListData, setWatchListData] = useState("");

  function componentDidMount() {} //set the stock context from data in the database

  return (
    <div className="App">
      <div className="main-container">
        <StockContext.Provider value={{ stockData, setStockData }}>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/WatchListPage" element={<WatchListPage />} />
            </Routes>
          </BrowserRouter>
        </StockContext.Provider>
      </div>
    </div>
>>>>>>> master
  );
}
export default App;
