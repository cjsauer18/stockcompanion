import { getData } from "../../utility/loadChartData";
import { formatData } from "../../utility/loadChartData";

class Alert {
  constructor(ticker, interval) {
    this.name = ticker;
    this.interval = interval;
    this.start = Math.floor(Date.now() / 1000);
    this.isActive = false;
    this.url = `http://localhost:5000/members?ticker=${this.name}&start=${
      this.start
    }&end=${this.start + 100000}&interval=1m&range=1d`;
    //see what this brings me
    this.startPrice = "";
    console.log("start price:", this.startPrice);
  }

  async getPrice() {
    try {
      const query = await fetch(this.url).then((response) => {
        console.log("Getting data:", response.data);
        return formatData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
    console.log(this.startPrice);
  }

  toggleActive() {
    if (this.isActive) {
      this.isActive = false;
    } else {
      this.isActive = true;
      //this.stock.refresh();
    }
  }
}

export default Alert;
