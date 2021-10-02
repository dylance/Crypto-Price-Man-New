const { getAccounts, getPriceTicker } = require('../../services/coinbasepro');

module.exports = async function(req, res, next) {
  try {
    const { showAccountsWithBalance } = req.query;

    const accounts = await getAccounts(showAccountsWithBalance);

    const accountsWithPrices = await Promise.all(
      accounts.map(async account => {
        const USDPrice = await getPriceTicker(`${account.currency}-USD`);
        const BTCPrice = await getPriceTicker(`${account.currency}-BTC`);

        return {
          ...account,
          USDPrice: USDPrice ? USDPrice.price : undefined,
          USDTotal: USDPrice
            ? ((0 + USDPrice.price) * (0 + account.balance)).toFixed(3)
            : 0,
          BTCPrice: BTCPrice ? BTCPrice.price : undefined,
        };
      })
    );

    const sortedAccounts = accountsWithPrices.sort((firstEl, secondEl) => {
      return firstEl.USDTotal < secondEl.USDTotal ? 1 : -1;
    });

    await res.send(sortedAccounts);
  } catch (err) {
    console.log('the error is: ', error);
    next(err);
  }
};
