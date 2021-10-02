const { makeCoinbaseProRequest } = require('./helpers');

const getPriceTicker = async (productId = 'BTC-USD') => {
  try {

    const path = `/products/${productId}/ticker`

    const { data } = await makeCoinbaseProRequest(path);

    return data;
  } catch (err) {
    console.log('The getPriceTicker error is: ', err);
  }
};

module.exports = getPriceTicker;
