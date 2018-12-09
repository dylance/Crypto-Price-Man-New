const axios = require('axios');
const { swapProperty }= require('../../utils/apiUtils')

module.exports = app => {



  const coinList = ['BTC', 'BCH', 'ETH', 'ETC', 'LTC', 'XRP', 'ADA', 'ZEC', 'TRX', 'SC']
  const coinsUrl = 'https://bittrex.com/api/v1.1/public/getticker'
  let prices = [];

  function compare(a,b) {
  if (a.price > b.price)
    return -1;
  if (a.price < b.price)
    return 1;
  return 0;
}

  setInterval(() => {
    axios.all(coinList.map(
      coin => axios.get(coinsUrl, {
        params: {
          market: `USD-${coin}`
        }
      })))
      .then(axios.spread((...res) => {
        return res.map(({data}, key) => {
          data.result.coin = coinList[key]
          data.result.price = data.result.Last;
          delete data.result.Last;
          return data.result
      })
    }))
    .then(pricess => {
      prices = pricess
    })
  }, 10000)



  app.get('/api/bittrex/coins-ticker2', (req, res) => {
    res.send(prices)
  })

  app.get('/api/bittrex/coins-ticker', (req , res) => {
    axios.get('https://bittrex.com/api/v1.1/public/getmarketsummaries')
      .then(({data}) => {
        //console.log("the data is", data.result)
      let bittrex = data.result.filter( (coin, key) =>  coin.MarketName.indexOf("USD-")  === 0)

      bittrex.forEach((coin, index) => {
        coin.MarketName = coin.MarketName.replace('USD-', '')
        coin.coin = coin.MarketName.replace('USD-', '')
        swapProperty(coin,'price','Last')
        swapProperty(coin,'volume','Volume')
        swapProperty(coin,'high','High')
        swapProperty(coin,'low','Low')

        console.log("the new market name is: ", coin.MarketName)
      })

      bittrex = bittrex.sort(compare);
      //bittrex = bittrex.slice(0, 6).concat(bittrex.slice(-6));
      //bittrex = bittrex.slice(0, 7).concat(bittrex.slice(-7));
      //bittrex = bittrex.splice(7, 1);
      console.log("zzz", bittrex)
      bittrex = bittrex.filter(coin => {
        //console.log("abc", coin.MarketName)

        if ( coin.MarketName != 'USDT' && coin.MarketName != 'TUSD') {console.log('con markt name: ', coin.MarketName)}
        return  (coin.MarketName != 'USDT' && coin.MarketName != 'TUSD')


      })

      //console.log("ja;dfj", bittrex)

      return bittrex;

      })
      .then(response => {
        //console.log("the response is", response)
        res.send(response)
      })
  })
}
