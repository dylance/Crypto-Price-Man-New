const axios = require('axios');
const util = require('util');

const getAccessSign = require('./getAccessSign');
const { coinbaseKey } = require('../../../config/keys');

const getWalletID = async (walletName = 'USD Wallet') => {
  try {
    const afterDate = new Date('2021:01:01').toISOString(); //"2011-12-19T15:28:46.493Z"
    const path = `/v2/accounts`;
    const method = 'GET';
    const { accessSign, timeStamp } = await getAccessSign(method, path);

    const config = {
      method: method,
      url: 'https://api.coinbase.com' + path,
      headers: {
        'Content-type': 'application/json',
        'CB-ACCESS-KEY': coinbaseKey,
        'CB-ACCESS-SIGN': accessSign,
        'CB-ACCESS-TIMESTAMP': timeStamp,
        'CB-VERSION': '2021-02-20',
      },
    };

    const { data } = await axios(config);

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
