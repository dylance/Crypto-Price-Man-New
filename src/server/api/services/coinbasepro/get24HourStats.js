const { makeCoinbaseProRequest } = require('./helpers');

// @TODO prob rename
/*
https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductstats
I believe this may check the past 24 hours - either
starting exactly 24 hours before or the start of the previous day
appears to be 24 hours before so if i make request at 12-1 2:00 pm - returns from 11-30 1:00pm as open - verify
*/
const get24HourStats = async (product = 'BTC-USD') => {
  try {
    const path = `/products/${product}/stats`;

    const { data } = await makeCoinbaseProRequest(path);
    return data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = get24HourStats;
