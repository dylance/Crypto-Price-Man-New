const { makeCoinbaseProRequest } = require('./helpers');

const getCandles = async (product = 'BTC-USD') => {
  try {
    const startDate = new Date(2017, 4, 1).toISOString();
    const endDate = new Date(2017, 11, 30).toISOString();
    const slice = '86400';
    const path = `/products/${product}/candles?start=${startDate}&end=${endDate}&granularity=${slice}`;

    const { data } = await makeCoinbaseProRequest(path);

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
