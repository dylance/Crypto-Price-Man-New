const axios = require('axios');

const { getAccessSign } = require('./helpers');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getTrades = async (tradePair = 'BTC-USD') => {
  try {
    const path = `/fills?product_id=${tradePair}`;
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

    const tradesThisYear = data.filter(trade => {
      let startDate = new Date('2020-01-01T03:24:00');
      console.log("The start date is: ", startDate)
      let tradeDate = new Date(trade.created_at);
      return (tradeDate < startDate && trade.side === 'buy');
    });

    const total = tradesThisYear.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.price) * parseFloat(deposit.size);
    }, 0);

    const amount = tradesThisYear.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.size);
    }, 0);

    const average = total / amount;

    console.log("The trades this year are: ", tradesThisYear);
    console.log("The total is: ", total);
    console.log("The amount is: ", amount);
    console.log("The average is: ", average);


  } catch (err) {
    console.log('The error is: ', err);
  }
};
