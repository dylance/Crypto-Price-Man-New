const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../../config/keys');

/**
 * Makes requst to coinbase pro REST API
 * See coinbase pro documentation - https://docs.pro.coinbase.com
 * @function
 * @param {string} path - relative path of coinbase pro endpoint
 * @param {string} method - HTTP method of request @TODO how to show default method???
 * @returns {object} - express response
 * @TODO error handling in here????
 */
const makeCoinbaseProRequest = async (path, method = 'GET') => {
  try {
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

    const response = await axios(config);

    return response;
  } catch (err) {
    //console.log('The error is: 5', err);
  }
};

module.exports = makeCoinbaseProRequest;
