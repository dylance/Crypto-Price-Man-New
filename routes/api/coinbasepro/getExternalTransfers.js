const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getExternalTransfers = async (product = 'BTC-USD', type = 'deposit') => {
  try {
    const path = `/transfers?type=${type}`;
    //const path = `/accounts`;
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

    const { data } = await axios(config);

    return data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};
module.exports = getExternalTransfers;
