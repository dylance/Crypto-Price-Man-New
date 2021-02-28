const crypto = require('crypto');

const getTimestamp = require('./getTimestamp');
const { coinbaseProSecret } = require('../../../config/keys');

const getAccessSign = async (method, path) => {
  const timeStamp = await getTimestamp();

  const preHash = timeStamp + method + path;
  const key = Buffer.from(coinbaseProSecret, 'base64');
  const hmac = crypto.createHmac('sha256', key);
  const accessSign = hmac.update(preHash).digest('base64');

  return { accessSign, timeStamp };
};

module.exports = getAccessSign;
