const axios = require('axios');
const util = require('util');

const getAccessSign = require('./getAccessSign');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getCoinMarketCapData = async () => {
  try {
    const afterDate = new Date('2020:01:01').toISOString(); //"2011-12-19T15:28:46.493Z"
    const path = `/transfers?type=deposit&before=${afterDate}`;
    const method = 'GET';
    const { accessSign, timeStamp } = await getAccessSign(method, path);

    const config = {
      method: method,
      url: 'https://api.pro.coinbase.com' + path,
      headers: {
        'CB-ACCESS-KEY': coinbaseProKey,
        'CB-ACCESS-SIGN': accessSign,
        'CB-ACCESS-TIMESTAMP': timeStamp,
        'CB-ACCESS-PASSPHRASE': coinbaseProPassphrase,
      },
    };

    const { data } = await axios(config);
    const deposits = data.filter(deposit => {
      return deposit.details.is_instant_usd === 'true';
    });

    const total = deposits.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.amount);
    }, 0);

    deposits.forEach(deposit => {
      const depositDate = new Date(deposit.created_at).toDateString();
      console.log(`deposited ${parseFloat(deposit.amount)} on ${depositDate}`);
    });

    console.log('The number of deposits is: ', deposits.length);
    console.log('The total are: ', total);
  } catch (err) {
    console.log('The error is: ', err);
  }
};

getCoinMarketCapData();

//getTimestamp();
