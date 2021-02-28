
const util = require('util');

const getWalletID = require('./getWalletID');
const { makeCoinbaseRequest } = require('./helpers');

const getTransactions = async (walletName = 'USD Wallet') => {
  try {
    const walletId = await getWalletID(walletName);

    const path = `/v2/accounts/${walletId}/transactions`;
    const method = 'GET';

    const { data } = await makeCoinbaseRequest(path, method);

    console.log('The data is: ', util.inspect(data.data.reverse(), false, null, true));
    return data.data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getTransactions;

getTransactions('LTC Wallet');
