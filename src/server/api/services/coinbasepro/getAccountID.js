const { makeCoinbaseProRequest } = require('./helpers');

const getAccountID = async (currency = 'BTC') => {
  try {
    const path = `/accounts`;
    const method = 'GET';

    const { data: accounts } = await makeCoinbaseProRequest(path, method);

    account = accounts.find(account => {
      return account.currency === currency;
    });

    return account.id;
  } catch (err) {
    console.log('The error is: ', err);
  }
};
module.exports = getAccountID;
