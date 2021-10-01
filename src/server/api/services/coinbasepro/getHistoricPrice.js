const { makeCoinbaseProRequest } = require('./helpers');

const getHistoricPrice = async (product = 'BTC-USD') => {
  try {

  //1994-11-05T08:15:30-05:00 corresponds to November 5, 1994, 8:15:30 am, US Eastern Standard Time.
  //1994-11-05T13:15:30Z corresponds to the same instant.
    const startDate = new Date(2021, 7, 9, 12, 55).toISOString();
    const endDate = new Date(2021, 7, 9, 12, 55).toISOString();
    const slice = '60';
    const path = `/products/${product}/candles?start=${'2021-08-02T12:31:05.633981Z'}&end=${'2021-08-02T12:35:05.633981Z'}&granularity=${slice}`;

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

getHistoricPrice();

module.exports = getHistoricPrice;
