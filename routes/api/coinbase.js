const axios = require('axios');

module.exports = app => {

  let json = null;
  const coinList = ['btc', 'eth', 'ltc', 'bch']
  let pricess = "this is my prices"
  const coinUrls = coinList.map(coin => `https://api.pro.coinbase.com/products/${coin}-usd/ticker`)


  setInterval( () => {  axios.all(coinUrls.map(url => axios.get(url)))
        .then(response => {
          return response.map((item, key) => {
            item.data.coin = coinList[key]
            return item.data
          })
        })
        .then(prices => {
          pricess = prices;
        })},10000)

  app.get('/api/coinbase/coins-ticker', (req, res) => {
  //  const coinUrls = coinList.map(coin => `https://api.pro.coinbase.com/products/${coin}-usd/ticker`)

    res.send(pricess)
  })



  app.get('/api/coinbase/coins-stats', (req, res) => {
    const coinUrls = coinList.map(coin => `https://api.pro.coinbase.com/products/${coin}-usd/ticker`)

    axios.all(coinUrls.map(url => axios.get(url)))
      .then(response => {
        return response.map((item, key) => {
          item.data.coin = coinList[key]
          return item.data
        })
      })
      .then(prices => {
        res.send(prices)
      })
  })

  app.get('/api/coinbase/coins-stats', (req, res) => {
    const coinUrls = coinList.map(coin => `https://api.pro.coinbase.com/products/${coin}-usd/stats`)

    axios.all(coinUrls.map(url => axios.get(url))).then(axios.spread((...res) => {
      return res.map((item, key) => {
        item.data.coin = coinList[key]
        return item.data
      })
    })).then(prices => {
      res.send(prices)
    })
  })

  app.get('/api/coinbase/everything', (req, res) => {
    const coinUrls = coinList.map(coin => `https://api.pro.coinbase.com/products/${coin}-usd/stats`)
    const coinUrls2 = coinList.map(coin => `https://api.pro.coinbase.com/products/${coin}-usd/ticker`)
    const coinUrls3 = coinUrls2.concat(coinUrls);
    console.log("coinurls3 lenght is:", coinUrls3.constructor === Array)
      axios.all(coinUrls3.map(url => axios.get(url))).then(axios.spread((...response)=> {
        console.log(response[0])
        return response.map((item, key) => {
          item.data.coin = coinList[key]
          return item.data
        })
      })).then(prices => {
        res.send(prices)
      })
  })

}
