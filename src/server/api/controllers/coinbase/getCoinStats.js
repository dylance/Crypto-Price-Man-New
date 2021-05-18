const axios = require('axios');

const { roundDecimals } = require('../../utils/apiUtils');

const getCoinStats = (req, res) => {
  // @TODO define/get coinlist a better way - may even deprecate this function - from 2018 lol
  const coinList = ['BTC', 'ETH'];
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
};

module.exports = getCoinStats;
