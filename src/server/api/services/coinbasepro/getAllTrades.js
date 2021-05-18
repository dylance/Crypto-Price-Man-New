const axios = require('axios');

const { getAccessSign } = require('./helpers');
const getHistoricPrices = require('./getHistoricPrices');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getAllTrades = async (quoteCurrency, baseCurrency) => {
  try {
    const path = `/fills?product_id=${quoteCurrency}-${baseCurrency}`;
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
      let startDate = new Date('2021-01-01T00:00:00.000Z');
      //let endDate = new Date('2020-12-30T00:00:00.000Z');
      let endDate = Date.now();
      let tradeDate = new Date(trade.created_at);
      return tradeDate > startDate && tradeDate < endDate;
    });

    return tradesThisYear;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getAllTrades;
