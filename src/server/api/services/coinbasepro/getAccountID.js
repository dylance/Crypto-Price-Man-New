const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getAccountID = async (currency = 'BTC') => {
  try {
    const path = `/accounts`;
    const method = 'GET';
    const { accessSign, timeStamp } = await getAccessSign(method, path);

    const config = {
      method: method,
      url: `https://api.pro.coinbase.com${path}`,
      headers: {
        'CB-ACCESS-KEY': coinbaseProKey,
        'CB-ACCESS-SIGN': accessSign,
        'CB-ACCESS-TIMESTAMP': timeStamp,
        'CB-ACCESS-PASSPHRASE': coinbaseProPassphrase,
      },
    };

    const { data: accounts } = await axios(config);
    account = accounts.find(account => {
      return account.currency === currency;
    });

    return account.id;
  } catch (err) {
    console.log('The error is: ', err);
  }
};
module.exports = getAccountID;
