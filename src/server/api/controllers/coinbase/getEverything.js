const axios = require('axios');

const getEverything = (req, res) => {
  const coinList = ['BTC', 'ETH'];
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
};

module.exports = getEverything;
