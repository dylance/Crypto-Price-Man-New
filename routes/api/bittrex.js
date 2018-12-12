const axios = require('axios');
const { swapProperty, multiSwap }= require('../../utils/apiUtils')

module.exports = app => {

  const coinList = ['BTC', 'BCH', 'ETH', 'ETC', 'LTC', 'XRP', 'ADA', 'ZEC', 'TRX', 'SC'];
  const coinsUrl = 'https://bittrex.com/api/v1.1/public/getticker';
  const coinsMktUrl = 'https://bittrex.com/api/v1.1/public/getmarketsummaries';
  let prices = [];
  const swapData = [
    ['price', 'Last'],
    ['volume','Volume'],
    ['high','High'],
    ['low','Low'],
  ]

  setInterval(getBittrexPrices ,10000)

  app.get('/api/bittrex/coins-ticker', (req , res) => {
    res.send(prices);
  })

  function getBittrexPrices() {
    axios.get(coinsMktUrl)
      .then(({data}) => {

        let bittrex = data.result.filter((coin, key) =>  coin.MarketName.indexOf("USD-")  === 0)

        bittrex.forEach((coin, index) => {
          coin.MarketName = coin.MarketName.replace('USD-', '')
          coin.coin = coin.MarketName.replace('USD-', '')
          multiSwap(coin, swapData);
        })

        bittrex = bittrex.sort(sortPrices);

        prices = bittrex.filter(coin => (coin.MarketName != 'USDT' && coin.MarketName != 'TUSD'))
      })
  }

  function sortPrices(a,b) {
    if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  }
}
