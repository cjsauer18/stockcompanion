import "./styles.css";
import React, { useEffect, useState, useContext } from "react";
import WatchListPage from "./Pages/WatchListPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Nav from "./Components/Nav.jsx";
import { StockContext } from "./Contexts/StockContext";
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
  );
}
export default App;
