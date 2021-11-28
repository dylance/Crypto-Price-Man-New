const { makeCoinbaseProRequest } = require('./helpers');

// @TODO rename this to something related to a specific price
const getHistoricPrice = async (product = 'BTC-USD', date, granularity = 60) => {
  try {
    /*
    Unless otherwise specified, all timestamps from API are returned in ISO 8601 with microseconds.
    Make sure you can parse the following ISO 8601 format.
    Most modern languages and libraries will handle this without issues.
    https://docs.cloud.coinbase.com/exchange/docs/types
    API doc - https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductcandles
    */

  //

    const startDate = new Date(date);
    // adds 60 seconds to the start time
    const endDate = new Date(startDate.getTime() + 60000);
    const slice = granularity;
    const path = `/products/${product}/candles?start=${startDate.toISOString()}&end=${endDate.toISOString()}&granularity=${slice}`;

    const { data } = await makeCoinbaseProRequest(path);
    if(data[0]) {
      const price = data[0][3];
      return {
        price,
        date
      }
    }
    console.log("The data is: ", data);
    // [timestamp, price_low, price_high, price_open, price_close]
    return data[0][3];
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getHistoricPrice;

/*
//1994-11-05T08:15:30-05:00 corresponds to November 5, 1994, 8:15:30 am, US Eastern Standard Time.
//1994-11-05T13:15:30Z corresponds to the same instant.
[
    [
        1637048520,
        60474.78,
        60558.32,
        60502.6,
        60532.31,
        6.88844238
    ]
]

[
    [
        1637048520,
        60474.78,
        60558.32,
        60502.6,
        60532.31,
        6.88844238
    ]
]



*/
