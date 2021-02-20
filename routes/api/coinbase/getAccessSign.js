const crypto = require('crypto');

const getTimestamp = require('./getTimestamp');
const { coinbaseSecret } = require('../../../config/keys');

const getAccessSign = async (method, path) => {
  const timeStamp = await getTimestamp();
  const timeStampString = await timeStamp.toString();
  console.log("The timeStampString is: ", timeStampString);
  console.log("The timeSTamp here is: ", timeStamp)
  console.log("The coinbaseSecret is: ", coinbaseSecret)
  console.log("The method is: ", method);
  console.log("The path is: ", path)

  const preHash = await timeStampString + method + path;
  //const key = await Buffer.from(coinbaseSecret, 'base64');
  const hmac = await crypto.createHmac('sha256', coinbaseSecret);
  const accessSign = await hmac.update(preHash).digest('hex');

  return { accessSign, timeStamp };
};

module.exports = getAccessSign;

// const signature = crypto
//     .createHmac('sha256', key)
//     .update(message)
//     .digest('hex')


// var crypto = require('crypto');
//
// var secret = 'PYPd1Hv4J6/7x...';
//
// var timestamp = Date.now() / 1000;
// var requestPath = '/orders';
//
// var body = JSON.stringify({
//     price: '1.0',
//     size: '1.0',
//     side: 'buy',
//     product_id: 'BTC-USD'
// });
//
// var method = 'POST';
//
// // create the prehash string by concatenating required parts
// var what = timestamp + method + requestPath + body;
//
// // decode the base64 secret
// var key = Buffer(secret, 'base64');
//
// // create a sha256 hmac with the secret
// var hmac = crypto.createHmac('sha256', key);
//
// // sign the require message with the hmac
// // and finally base64 encode the result
// return hmac.update(what).digest('base64');
