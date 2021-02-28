const axios = require('axios');

const { getAccessSign } = require('./helpers');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getCandles = async (product = 'BTC-USD') => {
  try {
    const startDate = new Date(2017, 4, 1).toISOString();
    const endDate = new Date(2017, 11, 30).toISOString();
    const slice = '86400';
    const path = `/products/${product}/candles?start=${startDate}&end=${endDate}&granularity=${slice}`;
    const method = 'GET';
    const { accessSign, timeStamp } = await getAccessSign(method, path);

    const config = {
      method: method,
      url: `https://api.pro.coinbase.com${path}`,
      headers: {
        'CB-ACCESS-KEY': coinbaseProKey,
        'CB-ACCESS-SIGN': accessSign,
        'CB-ACCESS-TIMESTAMP': timeStamp,
        'CB-ACCESS-PASSPHRASE': coinbaseProPassphrase,
      },
    };

    const { data } = await axios(config);

    console.log('The data is: ', data);
    data.forEach(candle => {
      console.log('The close price is: ', candle[4]);
    });
    return data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};
module.exports = getCandles;
