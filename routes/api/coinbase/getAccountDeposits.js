const axios = require('axios');
const util = require('util');

const getAccessSign = require('./getAccessSign');
const getWalletID = require('./getWalletID');
const { coinbaseKey } = require('../../../config/keys');

const getAccountDeposits = async (walletName = 'USD Wallet') => {
  try {
    const walletId = await getWalletID(walletName);
    const afterDate = new Date('2021:01:01').toISOString(); //"2011-12-19T15:28:46.493Z"
    // original path
    //const path = `/v2/accounts/${walletId}/deposits`;
    const path = `/v2/accounts/${walletId}/transactions`;
    const method = 'GET';
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

    const { data } = await axios(config);

    console.log('The data is: ', util.inspect(data.data, false, null, true));

    // console.log("The account deposits are: ", util.inspect(data.data, false, null, true));
    // data.data.forEach(deposit => {
    //   const depositDate = new Date(deposit.created_at).toDateString();
    //   console.log(`The deposit was ${deposit.amount.amount} on ${depositDate}`)
    // })
    //
    // const total = data.data.reduce((acc, deposit) => {
    //   //console.log('The deposit amount is: ', deposit.amount);
    //   return acc + parseFloat(deposit.amount.amount);
    // }, 0);
    // console.log("The total is: ", total)
  } catch (err) {
    console.log('The error is: ', err.response.data);
  }
};

module.exports = getAccountDeposits;
