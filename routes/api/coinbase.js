const axios = require('axios');

module.exports = app => {

  let json = null;
  const coinList = ['btc', 'eth', 'ltc', 'bch']

  app.get('/api/coinbase/coins', (req, res) => {
    const coinUrls = coinList.map(coin => {
      return `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
    })

    axios.all(coinUrls.map(l => axios.get(l))).then(axios.spread((...res) => {
      return res.map((item, key) => {
        item.data.coin = coinList[key]
        return item.data
      })
    })).then(prices => {
      res.send(prices)
    })
  })

  app.get('/api/coinbase/coins-stats', (req, res) => {
    const coinUrls = coinList.map(coin => {
      return `https://api.pro.coinbase.com/products/${coin}-usd/stats`
    })

    axios.all(coinUrls.map(l => axios.get(l))).then(axios.spread((...res) => {
      return res.map((item, key) => {
        item.data.coin = coinList[key]
        return item.data
      })
    })).then(prices => {
      res.send(prices)
    })
  })
}
