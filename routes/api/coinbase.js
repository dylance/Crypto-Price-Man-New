const axios = require('axios');

module.exports = app => {

    let json = null;
    const coinList = ['btc', 'eth', 'ltc', 'bch']

    app.get('/api/coinbase/coins', (req, res) => {
      const coinUrls = coinList.map(coin => {
        return `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
      })

      axios.all(coinUrls.map(l => axios.get(l))).then(axios.spread(function(...res) {
        return res.map((item, key) => {
          item.data.coin = coinList[key]
          return item.data
        })
      })).then(fun => {
        res.send(fun)
      })


    })

}




    // axios.get('https://api.pro.coinbase.com/products/btc-usd/ticker')
    //   .then(function (response) {
    //     console.log("The response is ", response.data);
    //     json = response.data
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     res.send(error);
    //   });
    //
    // app.get('/api/coinbase/btc-usd', (req, res) => {
    //   res.send(json);
    //
    //
    // })
    //
    // app.get('/api/coinbase/products', (req, res) => {
    //   axios.get('https://api.pro.coinbase.com/products')
    //     .then(function (response) {
    //       console.log("The response is ", response.data);
    //       products = response.data
    //       res.send(products);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       res.send(error);
    //     });
    //
    //
    //
    // })
