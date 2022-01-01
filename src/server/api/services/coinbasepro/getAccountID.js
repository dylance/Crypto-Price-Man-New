const { makeCoinbaseProRequest } = require('./helpers');
const getAllTrades = require('./getAllTrades');

const getAccountID = async (currency = 'BTC') => {
  try {
    const path = `/accounts`;
    const method = 'GET';
    console.log("Is this run?")
    const { data: accounts } = await makeCoinbaseProRequest(path, method);
    //return accounts;

    console.log('The accounts are: ', accounts);

    account = accounts.find(account => {
      return account.currency === currency;
    });

    return account.id;
  } catch (err) {
    console.log('The error is: ', err);
  }
};
getAccountID();

module.exports = getAccountID;
