const { get24HourStats } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { tradePair } = req.query;

    const data = await get24HourStats(tradePair);

    res.status(200).send(data);
  } catch (err) {
    console.log('the error is: ', err);
    next(err);
  }
};
