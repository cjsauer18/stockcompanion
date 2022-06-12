import "./styles.css";
import React, { useEffect, useState, useContext } from "react";
import WatchListPage from "./Pages/WatchListPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Nav from "./Components/Nav.jsx";
import { LoginContext } from "./Contexts/LoginContext";
// import your route components too

function App() {
  const [chartData, setChartData] = useState("");
  return (
    <div className="App">
      <div className="main-container">
        <LoginContext.Provider value={{ chartData, setChartData }}>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/WatchListPage" element={<WatchListPage />} />
            </Routes>
          </BrowserRouter>
        </LoginContext.Provider>
      </div>
    </div>
  );
}
export default App;
