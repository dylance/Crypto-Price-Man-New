const axios = require('axios');
const util = require('util');

const getAccessSign = require('./getAccessSign');
const getWalletID = require('./getWalletID');
const { coinbaseKey } = require('../../../config/keys');

const getTransfers = async () => {
  try {
    const path = `/v2/transfers?type=deposit`;
    const path = `/v2/transfers?type=deposit`;
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
    return data;
  } catch (err) {
    console.log('The error is: ', err.response.data);
  }
};

getTransfers();

module.exports = getTransfers;
