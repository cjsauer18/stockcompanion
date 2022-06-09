import React, { useState, useEffect } from "react";
import ChartJS from "../Chart/Chart";
import MadeData from "../Chart/Data";

const Apps = () => {
  const [chartsToDisplay, setChartsToDisplay] = useState([]);

  const getData = async () => {
    const charts = [];
    charts.push(<ChartJS key={1} data={MadeData} />);
    setChartsToDisplay(charts);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div className="Apps">{chartsToDisplay}</div>;
};

export default Apps;
