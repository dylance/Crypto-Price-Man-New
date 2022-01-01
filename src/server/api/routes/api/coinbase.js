const axios = require('axios');
const { roundDecimals } = require('../../utils/apiUtils');
const { getCandles } = require('../../services/coinbasepro');
const coinbaseController = require('../../controllers/coinbase');

module.exports = app => {
  // @TODO obviously combine 3 routes below
  app.get('/api/coinbase/candlesTicker', async (req, res) => {
    const candles = await getCandles();
    await res.send(candles);
  });
  app.get('/api/coinbase/eth-ticker', async (req, res) => {
    const candles = await getCandles('ETH-USD');
    await res.send(candles);
  });
  app.get('/api/coinbase/ltc-ticker', async (req, res) => {
    const candles = await getCandles('LTC-USD');
    await res.send(candles);
  });

  app.get('/api/coinbase/coins-stats', coinbaseController.getCoinStats);

  app.get('/api/coinbase/trades', coinbaseController.getTradeHistory);

  // @TODO very likely will need to deprecate/change this also from 2018
  app.get('/api/coinbase/everything', coinbaseController.getEverything);
  app.get('/api/coinbase/accounts', coinbaseController.getAccounts);
  app.get('/api/coinbase/price-ticker', coinbaseController.getProductPriceTicker);
  app.get('/api/coinbase/historic-price', coinbaseController.getHistoricPrice);
  app.get('/api/coinbase/daily-stats', coinbaseController.get24HourStats);

};
