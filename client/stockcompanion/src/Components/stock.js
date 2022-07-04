class Stock {
  constructor(ticker) {
    this.ticker = ticker;
    this.endTime = Date.now(); //time elapsed since the unix os starting
    this.startTime = this.endTime - 604800; //seven days, 1 week in second: Default range
    this.data = getData(this.ticker, this.startTime, this.endTime);
  }
  *getRange() {}
  *getData() {
    return this.getData(this.ticker, this.startTime, this.endTime);
  }

  //change aorund so that this is in string format, and checked before assignemnt. Checking should happen in this setter method.
  *setRange(first, second) {
    this.startTime = first;
    this.endTime = second;
  }
}
