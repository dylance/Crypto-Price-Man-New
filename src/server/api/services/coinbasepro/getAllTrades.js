const { makeCoinbaseProRequest } = require('./helpers');

// https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getfills
const getAllTrades = async (
  quoteCurrency = 'BTC',
  baseCurrency = 'USD',
  startDate = '2021-01-01T00:00:00.000Z'
) => {
  try {
    const path = `/fills?product_id=${quoteCurrency}-${baseCurrency}`;

    const { data: trades } = await makeCoinbaseProRequest(path);

    const tradesBetweenDates = trades.filter(trade => {
      const endDate = Date.now();
      //const endDate = new Date('2020-12-31');
      const tradeDate = new Date(trade.created_at);
      return tradeDate > new Date(startDate) && tradeDate < endDate;
    });

    return tradesBetweenDates;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getAllTrades;

/**
  trades are returned with most recent first
  Trade Example
  {
    created_at: '2021-09-21T09:51:45.810916Z',
    trade_id: 123,
    product_id: 'BTC-USD',
    order_id: '123',
    user_id: '123',
    profile_id: '123',
    liquidity: 'M',
    price: '10000.00000000',
    size: '0.25550000',
    fee: '1.1891000000000000',
    side: 'buy',
    settled: true,
    usd_volume: '222237.8200000000000000'
  },
  */
