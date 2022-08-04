import "./styles.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { StockContext } from "./Contexts/StockContext";
import WatchListPage from "./Pages/WatchListPage";
import HomePage from "./Pages/HomePage";
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
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/old-home" element={<HomePage />} /> */}
          <Route path="/watchlist" element={<WatchListPage />} />
        </Routes>
      </BrowserRouter>
    </StockContext.Provider>
  );
}
export default App;
