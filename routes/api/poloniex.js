const axios = require('axios');

module.exports = app => {

  app.get('/api/poloniex/coins-ticker', (req,res) => {
    axios.get('https://poloniex.com/public?command=returnTicker')
      .then((response) => {
        // for( let coin in response.data) {
        //   console.log("the coin is", coin)
        // }
        // console.log("the object is: ", response.data.BTC_BCN )
        // BTC_BCN

        const props = Object.keys(response.data)
        let entries = Object.values(response.data)
        entries.map((coin, key) => {
          coin.coin = props[key]
          return coin
        })

        entries = entries.filter((coin, key) => {
            console.log(coin.coin.indexOf('USDT_'))
           return coin.coin.indexOf("USDT_")  === 0
         })

        res.send(entries)
      })
  })
}
