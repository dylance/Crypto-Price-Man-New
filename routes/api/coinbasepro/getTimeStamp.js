const axios = require('axios');

const getTimestamp = async () => {
  const config = {
    method: 'GET',
    url: 'https://api.pro.coinbase.com/time',
  };
  try {
    const res = await axios(config);

    return res.data.epoch;
  } catch (err) {
    console.log('The err is: ', err);
  }
};

module.exports = getTimestamp;
