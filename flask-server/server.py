from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin
import pullData
app = Flask("__name__")
CORS(app)

import requests
import json


import datetime



@app.route("/members", methods=["GET", "POST"])
def members(): #json array
    args = request.args
    ticker = str(args.get("ticker"))
    start = args.get("start")
    end = args.get("end")
    interval = args.get("interval")
    range = args.get("range")
    data = pullData.requestData(ticker, start, end, interval, range)
    return data


@app.route("/search", methods=["GET", "POST"])
# @cross_origin()
def search(): #json array
    args = request.args
    keyword = args.get("keyword")
    query = {'keyword':keyword, 'pageSize':20, 'pageIndex' : 1}
    response = requests.get('https://quotes-gw.webullfintech.com/api/search/pc/tickers', params=query)
    return response.json()


#API route
@app.route("/watchlist", methods=["GET", "POST"])
# @cross_origin()
def watchlist(): #json array
    args = request.args
    tickers = args.get("tickers")
    start = args.get("start")
    end = args.get("end")
    interval = args.get("interval")
    range = args.get("range")
   
    data = pullData.requestWatchListData(json.loads(tickers), start, end, interval, range)
    return data



if __name__ == "__main__":
    app.run(debug = True)
