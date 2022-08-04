import getData from "../../utility/loadChartData";
import { sleep } from "../../utility/util";

import Stock from "../stock";

function hash(string) {
  var hash = 0;
  if (string.length == 0) return hash;
  for (let x = 0; x < string.length; x++) {
    let ch = string.charCodeAt(x);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}

class Alert {
  constructor(stock, interval) {
    this.name = stock.name;
    this.interval = interval;
    //this.stock.refresh(); //the stock object automatically refreshes data for us to use dynamically in an alert.
    //this.startPrice = //this.stock.type = type;
    this.start = Date.now() / 1000;
    this.ALERT = false;
    this.isActive = false;
    this.url = `http://localhost:5000/members?ticker=${this.name}&start=${this.stock.startTime}&end=${this.stock.endTime}&interval=1m&range=1d`;
  }
  setAlert() {
    //do callback refresh thingy?
    sleep(5000);
    const startPrice = this.stock.getPrice();
    console.log("Getting start data", startPrice);
    setInterval(() => {
      //calculate price, its true.
      this.endPrice = this.stock.getPrice();
      this.percentChange =
        ((this.endPrice - this.startPrice) / this.interval) * 100;

      console.log(
        "[",
        this.name,
        ":ALERT] percentage change:",
        this.percentageChange
      );

      this.ALERT = true;
    }, this.interval);
  }
  getCurrentPercentageChange() {
    return this.percentageChange;
  }

  resetAlarm() {
    this.ALARM = false;
    this.startPrice = this.stock.getPrice();
  }

  toggleActive() {
    if (this.isActive) {
      this.isActive = false;
      // this.stock.haltRefresh();
    } else {
      this.isActive = true;
      this.stock.setInterval(this.interval); //gets data implicitly
      //this.stock.refresh();
    }
  }
}

export default Alert;
