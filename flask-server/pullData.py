from pandas_datareader import data as pdr
import yfinance as yf
import yahoo_fin as yfin
import json
import datetime

yf.pdr_override() # pandas utility (dataframe) override for array formatting



#Not that sophisicated, but should work for basic formatting
def checkString(date_string):
    try:
        if "-" in date_string[0:4]:
            return False
        elif int(date_string[4:6]) > 12:
            return False
        elif int(date_string[7:9]) > 31:
            return False
        return True
    except Exception as E:
        print(E)
        return False

#ticker : string
#start : string <YYYY-MM-DD>
#end : string <YYYY-MM-DD>


def get_live_price(ticker):
    data = yf.Ticker(str(ticker))
    price = data.info
    print("INFO",price)
    return price


def requestData(ticker, start, end, interval, range):
    print("[DEBUG] ",ticker)

    start = str(datetime.datetime.fromtimestamp(int(start))).split(" ")[0]
    end = str(datetime.datetime.fromtimestamp(int(end))).split(" ")[0]
    print("[DEBUG] Start Date:",start)
    print("[DEBUG] Start Date:",end)

    start, end = str(start), str(end)
    if not checkString(start):
        print("[ERROR]: String format is incorrect for start date:",start)
    if not checkString(end):
        print("[ERROR]: String format is incorrect for end date:",end)
    
    
    data = pdr.get_data_yahoo(str(ticker), interval = str(interval), period=range)#, interval=str(interval) + "d", range=range)
    data = data.to_json()

    #print(data)
    return data



def requestWatchListData(tickers, start, end, interval, range):
    print("[DEBUG] ",tickers)

    start = str(datetime.datetime.fromtimestamp(int(start))).split(" ")[0]
    end = str(datetime.datetime.fromtimestamp(int(end))).split(" ")[0]
    print("[DEBUG] Start Date:",start)
    print("[DEBUG] Start Date:",end)

    start, end = str(start), str(end)
    if not checkString(start):
        print("[ERROR]: String format is incorrect for start date:",start)
    if not checkString(end):
        print("[ERROR]: String format is incorrect for end date:",end)
    
    
    data = pdr.get_data_yahoo(tickers, interval = str(interval), period=range)#, interval=str(interval) + "d", range=range)
    data = data.to_json()
    return data


