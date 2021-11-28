const { getHistoricPrice } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { tradePair, startDate, granularity } = req.query;
    // const sorted = await getTradesCostBasis(coin, baseCurrency);
    const data = await getHistoricPrice(tradePair, startDate, granularity);
    console.log("The data is: ", data)
    // await res.send(sorted);
    res.status(200).send(data)
  } catch (err) {
    console.log('the error is: ', err);
    next(err);
  }
};
