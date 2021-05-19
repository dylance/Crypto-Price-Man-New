const { getAccounts } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { showAccountsWithBalance } = req.query;
    const accounts = await getAccounts(showAccountsWithBalance);

    await res.send(accounts);
  } catch (err) {
    console.log('the error is: ', error);
    next(err);
  }
};
