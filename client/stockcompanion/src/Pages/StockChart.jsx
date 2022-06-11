import React, { useEffect, useState } from "react";

function StockChart(props) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/members")
      .then((res) => {
        //  console.log(res);
        return res.json();
      })
      .then((data) => {
        setData(data); //sets the state with the data
        console.log(data);
      });
  }, []);
  console.log("asdfadsfsdf");
  return <div></div>;
}

export default StockChart;
