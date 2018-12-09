const axios = require('axios');
const { swapProperty, multiSwap }= require('../../utils/apiUtils')

module.exports = app => {

  const swapData = [['price', 'last'],['high', 'high24hr'],['low', 'low24hr'],['volume', 'quoteVolume']]

  function compare(a,b) {
      a = parseInt(a.price);
      b = parseInt(b.price);

    if (a > b)
      return -1;
    if (a < b)
      return 1;
    return 0;
  }

  app.get('/api/poloniex/coins-ticker', (req,res) => {
    axios.get('https://poloniex.com/public?command=returnTicker')
      .then((response) => {
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

        entries.forEach((coin, index) => {
          coin.coin = coin.coin.replace('USDT_', '')
          multiSwap(coin, swapData);
        })

        entries = entries.sort(compare);

        res.send(entries)
      })
  })
}
