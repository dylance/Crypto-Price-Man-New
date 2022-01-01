const { getTradesCostBasis } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { coin, baseCurrency } = req.query;
    const trades = await getTradesCostBasis(coin, baseCurrency);
    await res.send(trades);
  } catch (err) {
    console.log('the error is: ', error);
    next(err);
  }
};
