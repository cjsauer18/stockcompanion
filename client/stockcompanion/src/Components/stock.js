import "../utility/loadChartData.js";

class Stock {
  constructor(ticker) {
    this.name = ticker;
    this.endTime = Date.now(); //time elapsed since the unix os starting
    this.startTime = this.endTime - 604800; //seven days, 1 week in second: Default range
    this.data = getData(this.ticker, this.startTime, this.endTime);
    //have a set timer inside this stock object?
  }
  *getRange() {}
  *getData() {
    //calls fetch data with parameters
  }
  *setInterval(interval) {
    //handle query
    //call the fetchData()
    this.getData();
  }
  *setRange(range) {}
  //change aorund so that this is in string format, and checked before assignemnt. Checking should happen in this setter method.
  *setRange(first, second) {
    this.startTime = first;
    this.endTime = second;
  }
  *collect() {
    SetTimeout(() => {});
  }
}
