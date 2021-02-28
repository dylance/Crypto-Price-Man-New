
const util = require('util');

const getWalletID = require('./getWalletID');
const { makeCoinbaseRequest } = require('./helpers');

const getDeposits = async (walletName = 'USD Wallet') => {
  try {
    const walletId = await getWalletID(walletName);

    const path = `/v2/accounts/${walletId}/deposits`;
    const method = 'GET';


    const { data } = await makeCoinbaseRequest(path, method);

    console.log('The data is: ', util.inspect(data.data, false, null, true));
    return data.data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getDeposits;

getDeposits('USD Wallet');
