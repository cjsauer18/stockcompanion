import "./styles.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import WatchListPage from "./Pages/WatchListPage";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/old-home" element={<HomePage />} /> */}
        <Route path="/watchlist" element={<WatchListPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
