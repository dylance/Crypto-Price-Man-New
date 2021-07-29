const { makeCoinbaseProRequest } = require('./helpers');

const getAllTrades = async (quoteCurrency, baseCurrency = 'USD') => {
  try {
    const path = `/fills?product_id=${quoteCurrency}-${baseCurrency}`;

    const { data: trades } = await makeCoinbaseProRequest(path);

    const tradesThisYear = trades.filter(trade => {
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
