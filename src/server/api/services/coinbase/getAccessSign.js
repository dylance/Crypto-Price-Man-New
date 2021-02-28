const crypto = require('crypto');

const getTimestamp = require('./getTimestamp');
const { coinbaseSecret } = require('../../../config/keys');

const getAccessSign = async (method, path) => {
  const timeStamp = await getTimestamp();
  const timeStampString = await timeStamp.toString();

  const preHash = (await timeStampString) + method + path;
  const hmac = await crypto.createHmac('sha256', coinbaseSecret);
  const accessSign = await hmac.update(preHash).digest('hex');

  return { accessSign, timeStamp };
};

module.exports = getAccessSign;
