const axios = require('axios');

const getTimestamp = async () => {
  const config = {
    method: 'GET',
    url: 'https://api.coinbase.com/v2/time',
  };
  try {
    const res = await axios(config);

    return res.data.data.epoch;
  } catch (err) {
    console.log('The err is: ', err);
  }
};

module.exports = getTimestamp;
