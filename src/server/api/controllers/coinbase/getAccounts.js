const { getAccounts, getPriceTicker } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { showAccountsWithBalance } = req.query;
    // @TODO this broke when coinbase pro was down. need better error handling
    const accounts = await getAccounts(showAccountsWithBalance);

    const accountsWithPrices = await Promise.all(
      accounts.map(async account => {
        const USDPrice = await getPriceTicker(`${account.currency}-USD`);
        const BTCPrice = await getPriceTicker(`${account.currency}-BTC`);

        return {
          ...account,
          USDPrice: USDPrice ? parseFloat(USDPrice.price) : undefined,
          USDTotal: USDPrice
            ? parseFloat(((0 + USDPrice.price) * (0 + account.balance)).toFixed(3))
            : undefined,
          BTCPrice: BTCPrice ? parseFloat(BTCPrice.price) : undefined,
          BTCTotal: BTCPrice
            ? parseFloat(((0 + BTCPrice.price) * (0 + account.balance)).toFixed(3))
            : undefined,
        };
      })
    );

    const descendingSortedAccounts = accountsWithPrices.sort((a, b) => {
       //   > 0 sort b before a
       //   < 0 sort a before b
      return (b.USDTotal || b.balance) > (a.USDTotal || a.balance) ? 1 : -1;
    });

    await res.send(descendingSortedAccounts);
  } catch (err) {
    console.log('the error is: ', err);
    next(err);
  }
};
