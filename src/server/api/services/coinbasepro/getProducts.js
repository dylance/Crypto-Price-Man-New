const { makeCoinbaseProRequest } = require('./helpers');

const getProducts = async () => {
  try {
    const path = `/products/`;

    const { data } = await makeCoinbaseProRequest(path);
    console.log('The data is: ', data);
    return data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getProducts;
