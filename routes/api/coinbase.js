const axios = require('axios');
const { roundDecimals } = require('../../utils/apiUtils');
const getCandles = require('./coinbasepro/getCandles');

module.exports = app => {
  let json = null;
  const coinList = ['btc', 'eth', 'ltc', 'bch', 'etc'];
  let pricess = [];
  const coinUrls = coinList.map(
    coin => `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
  );

  setInterval(async () => {
    try {
      const responses = await axios.all(coinUrls.map(url => axios.get(url)));

      const formattedPrices = responses.map(({data}, key) => {
        data.coin = coinList[key];
        data.price = roundDecimals(data.price);
        data.volume = roundDecimals(data.volume);
        return data;
      });

      pricess = formattedPrices;
    } catch (err) {
      console.error('The error is: ', err);
    }
  }, 10000);

  app.get('/api/coinbase/coins-ticker', (req, res) => {
    res.send(pricess);
  });

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

  app.get('/api/coinbase/coins-stats', (req, res) => {
    const coinUrls = coinList.map(
      coin => `https://api.pro.coinbase.com/products/${coin}-usd/stats`
    );

    axios
      .all(coinUrls.map(url => axios.get(url)))
      .then(
        axios.spread((...res) => {
          return res.map((item, key) => {
            item.data.coin = coinList[key];
            item.data.high = roundDecimals(item.data.high);
            item.data.low = roundDecimals(item.data.low);
            return item.data;
          });
        })
      )
      .then(prices => {
        res.send(prices);
      })
      .catch(error => {
        console.log('The error is:', error);
      });
  });

  app.get('/api/coinbase/everything', (req, res) => {
    const coinUrls = coinList.map(
      coin => `https://api.pro.coinbase.com/products/${coin}-usd/stats`
    );
    const coinUrls2 = coinList.map(
      coin => `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
    );
    const coinUrls3 = coinUrls2.concat(coinUrls);
    axios
      .all(coinUrls3.map(url => axios.get(url)))
      .then(
        axios.spread((...response) => {
          return response.map((item, key) => {
            item.data.coin = coinList[key];
            return item.data;
          });
        })
      )
      .then(prices => {
        res.send(prices);
      });
  });
};
