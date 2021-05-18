const axios = require('axios');
const util = require('util');

const { getAccessSign } = require('./helpers');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getHistoricPrices = async (quoteCurrency, baseCurrency, startDate) => {
  try {
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes()+1);
    //const afterDate = new Date('2021:01:01').toISOString(); //"2011-12-19T15:28:46.493Z"
    const path = `/products/${quoteCurrency}-${baseCurrency}/candles?start=${startDate}&end=${endDate}`;
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
    //console.log("The data is: ", data)

    return data[0][3];

    //console.log("The data is: ", data);

  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getHistoricPrices;
// const str = new Date('2021-01-08T17:47:01.188Z');
//
//
// str.setMinutes(str.getMinutes()+1);
// console.log("str is: ", str)
// getHistoricPrices('BTC', 'USD', '2021-01-08T17:47:01.188Z' );
// //return new Date(date.getTime() + minutes*60000);
//
// //'2021-01-08T17:47:01.188Z'
// // const date = new Date('2021-01-08T17:47:01.188Z');
// // console.log("The date is: ", date)
// // console.log("The new  is: ", new Date(date.getTime() + 60000000000))
//
// //getTimestamp();
//
// var s = new Date();
//
// s.setMinutes(s.getMinutes()+1);
//
// console.log(s.toISOString())
