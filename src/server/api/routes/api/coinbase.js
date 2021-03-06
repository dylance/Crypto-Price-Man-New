const axios = require('axios');
const { roundDecimals } = require('../../utils/apiUtils');
const { getCandles } = require('../../services/coinbasepro');
const coinbaseController = require('../../controllers/coinbase');

module.exports = app => {
  app.get('/api/coinbase/coins-ticker', (req, res) => {
    res.send('fix me!!');
  });
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

  app.get('/api/coinbase/sorted', coinbaseController.getEntireHistory);

  // @TODO very likely will need to deprecate/change this also from 2018
  app.get('/api/coinbase/everything', coinbaseController.getEverything);
};
