const util = require('util');
const { makeCoinbaseRequest } = require('./helpers');

const getWalletID = async (walletName = 'USD Wallet') => {
  try {
    const path = `/v2/accounts`;
    const method = 'GET';

    const { data } = await makeCoinbaseRequest(path, method);

    const wallet = data.data.find(wallet => {
      return wallet.name === walletName;
    });

    const walletId = wallet.id;
    return walletId;
  } catch (err) {
    console.log('The error is: ', err.response.data);
  }
};

module.exports = getWalletID;
