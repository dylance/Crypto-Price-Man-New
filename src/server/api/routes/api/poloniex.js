const axios = require("axios");
const { multiSwap } = require("../../utils/apiUtils");

module.exports = app => {
  const coinsPricesURL = 'https://poloniex.com/public?command=returnTicker';
  let prices = [];
  const swapData = [
    ["price", "last"],
    ["high", "high24hr"],
    ["low", "low24hr"],
    ["volume", "quoteVolume"],
  ];

  setInterval(getPoloniexPrices, 10000);

  app.get("/api/poloniex/coins-ticker", (req, res) => {
    res.send(prices);
  });

  function getPoloniexPrices() {
    axios.get(coinsPricesURL)
      .then(response => {
        const props = Object.keys(response.data);
        let entries = Object.values(response.data);
        entries.map((coin, key) => {
          coin.coin = props[key];
          return coin;
        });

        entries = entries.filter((coin, key) => {
          return coin.coin.indexOf("USDT_") === 0;
        });

        entries.forEach((coin, index) => {
          coin.coin = coin.coin.replace("USDT_", "");
          multiSwap(coin, swapData);
        });

        prices = entries.sort(sortPrices);
      });
  }

  function sortPrices(a, b) {
    a = parseInt(a.price);
    b = parseInt(b.price);

    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  }
};
