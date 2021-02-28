const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const { coinbaseKey } = require('../../../../config/keys');

/**
 * Makes requst to coinbase REST API
 * See coinbase pro documentation - https://developers.coinbase.com/api/v2
 * @function
 * @param {string} path - relative path of coinbase endpoint
 * @param {string} method - HTTP method of request
 * @returns {object} - express response
 *
 */
const makeCoinbaseRequest = async (path, method) => {
  try {
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

    const response = await axios(config);

    return response;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = makeCoinbaseRequest;
