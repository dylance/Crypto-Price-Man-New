const { makeCoinbaseProRequest } = require('./helpers');

const getPriceTicker = async (productId = 'BTC-USD') => {
  try {

    const path = `/products/${productId}/ticker`

    const { data } = await makeCoinbaseProRequest(path);

    return data;
  } catch (err) {
    console.log("The error is: ", err)
    return err
  }
};

module.exports = getPriceTicker;
