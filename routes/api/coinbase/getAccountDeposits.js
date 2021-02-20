const axios = require('axios');
const util = require('util');

const getAccessSign = require('./getAccessSign');
const getWalletID = require('./getWalletID');
const { coinbaseKey } = require('../../../config/keys');

const getAccountDeposits = async (walletName = 'USD Wallet') => {
  try {
    const walletId = await getWalletID(walletName);
    console.log('The coinbase key is: ', coinbaseKey);
    const afterDate = new Date('2021:01:01').toISOString(); //"2011-12-19T15:28:46.493Z"
    const path = `/v2/accounts/${walletId}/deposits`;
    const method = 'GET';
    const { accessSign, timeStamp } = await getAccessSign(method, path);
    console.log('the access sign is: ', accessSign);
    console.log('the timestamp is: ', timeStamp);

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

    console.log(util.inspect(data.data[0], false, null, true));
  } catch (err) {
    console.log('The error is: ', err.response.data);
  }
};

getAccountDeposits('USD Wallet');

module.exports = getAccountDeposits;
