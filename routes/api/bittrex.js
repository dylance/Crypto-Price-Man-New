const axios = require('axios');
const { swapProperty, multiSwap }= require('../../utils/apiUtils')

module.exports = app => {

  const coinList = ['BTC', 'BCH', 'ETH', 'ETC', 'LTC', 'XRP', 'ADA', 'ZEC', 'TRX', 'SC']
  const coinsUrl = 'https://bittrex.com/api/v1.1/public/getticker'
  let prices = [];
  const swapData = [['price', 'Last'],['volume','Volume'],['high','High'],['low','Low']]

  function compare(a,b) {
    if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  }

// setInterval(() => {
//   axios.all(coinList.map(
//     coin => axios.get(coinsUrl, {
//       params: {
//         market: `USD-${coin}`
//       }
//     })))
//     .then(axios.spread((...res) => {
//       return res.map(({data}, key) => {
//         data.result.coin = coinList[key]
//         data.result.price = data.result.Last;
//         delete data.result.Last;
//         return data.result
//     })
//   }))
//   .then(pricess => {
//     prices = pricess
//   })
// }, 10000)

  setInterval(() => {
    axios.get('https://bittrex.com/api/v1.1/public/getmarketsummaries')
      .then(({data}) => {

        let bittrex = data.result.filter((coin, key) =>  coin.MarketName.indexOf("USD-")  === 0)

        bittrex.forEach((coin, index) => {
          coin.MarketName = coin.MarketName.replace('USD-', '')
          coin.coin = coin.MarketName.replace('USD-', '')
          multiSwap(coin, swapData);
        })

        bittrex = bittrex.sort(compare);

        prices = bittrex.filter(coin => (coin.MarketName != 'USDT' && coin.MarketName != 'TUSD'))



      })
    },10000)
  // app.get('/api/bittrex/coins-ticker2', (req, res) => {
  //   res.send(prices)
  // })

  app.get('/api/bittrex/coins-ticker', (req , res) => {
    res.send(prices);

  })
}
