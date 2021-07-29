const { makeCoinbaseProRequest } = require('./helpers');

/**
 * Get List of trading accounts from the profile of the API key
 * See coinbase pro documentation - https://docs.pro.coinbase.com/?javascript#accounts
 * @function
 * @param {boolean} showAccountsWithBalance - returns accounts with balance when true
 * @returns {Array.<Account>} An array of trading accounts on coinbase pro
 *
 * Trading account on coinbase
 * @typedef {Object} Account - a coinbase pro trading account
 * @property {string} id - account id
 * @property {string} currency - the currency of the account
 * @property {number} balance -total funds in the account
 * @property {number} holds - funds on hold (not available for use)
 * @property {number} available - funds available to withdraw or trade
 * @property {string} profile_id - profile id of account
 * @property {boolean} trading_enabled - is trading enabled for this account
 */
const getAccounts = async (showAccountsWithBalance = false) => {
  console.log("Show accounts with balance is: ", showAccountsWithBalance)
  try {
    const path = `/accounts`;
    const method = 'GET';
    const { data: accounts } = await makeCoinbaseProRequest(path, method);

    const accountsWithNumbers = accounts.map(account => {
      return {
        ...account,
        balance: parseFloat(account.balance),
        hold: parseFloat(account.hold),
        available: parseFloat(account.available),
      };
    });

  //  console.log("the accounts are: ", accounts)

    if (showAccountsWithBalance === 'true') {
      console.log("is this hit???")
      const accountWithBalances = accountsWithNumbers.filter(
        account => account.balance > 0
      );

      return accountWithBalances;
    }

    return accountsWithNumbers;
  } catch (err) {
    //console.log('The error is: ', err);
  }
};
module.exports = getAccounts;
