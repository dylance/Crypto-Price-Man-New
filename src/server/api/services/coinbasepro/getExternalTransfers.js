const { makeCoinbaseProRequest } = require('./helpers');

const getExternalTransfers = async (product = 'BTC-USD', type = 'deposit') => {
  try {
    console.log('is this run???');
    const path = `/transfers?type=${type}`;

    const { data } = await makeCoinbaseProRequest(path);

    return data;
  } catch (err) {
    console.log('The error is:2 ', err);
  }
};

module.exports = getExternalTransfers;
