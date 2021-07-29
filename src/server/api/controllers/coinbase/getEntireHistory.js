const { getCostBasis } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { coin, baseCurrency } = req.query;
    const sorted = await getCostBasis(coin, baseCurrency);
    await res.send(sorted);
  } catch (err) {
    console.log('the error is: ', error);
    next(err);
  }
};
