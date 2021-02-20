const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getRenTrades = async () => {
  try {
    const path = `/fills?product_id=AAVE-BTC`;
    const method = 'GET';
    const { accessSign, timeStamp } = await getAccessSign(method, path);

    const config = {
      method: method,
      url: `https://api.pro.coinbase.com${path}`,
      headers: {
        'CB-ACCESS-KEY': coinbaseProKey,
        'CB-ACCESS-SIGN': accessSign,
        'CB-ACCESS-TIMESTAMP': timeStamp,
        'CB-ACCESS-PASSPHRASE': coinbaseProPassphrase,
      },
    };

    const { data } = await axios(config);
    //console.log("Te data is: ", data);

    const tradesThisYear = data.filter(trade => {
      let startDate = new Date('2021:01:01');
      let tradeDate = new Date(trade.created_at);
      return tradeDate > startDate;
    });

    const buys = tradesThisYear.filter(trade => {
      return trade.side === 'buy'
    });

    const sells = tradesThisYear.filter(trade => {
      return trade.side === 'sell'
    });

//     price: '49200.00000000',
// size: '0.01000001',

    const total = buys.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.price) * parseFloat(deposit.size);
    }, 0);

    const amount = buys.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.size);
    }, 0);

    const average = total / amount;

    //console.log("The trades this year are: ", buys);
    console.log("The total is: ", total);
    console.log("The amount is: ", amount);
    console.log("The average is: ", average);


    console.log('#########################');



    const total2 = sells.reduce((acc, deposit) => {
      //console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.price) * parseFloat(deposit.size);
    }, 0);

    const amount2 = sells.reduce((acc, deposit) => {
      //console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.size);
    }, 0);

    const average2 = total2 / amount2;

    //console.log("The trades this year are: ", sells);
    console.log("The total is: ", total2);
    console.log("The amount is: ", amount2);
    console.log("The average is: ", average2);




    //console.log('The data is: ', data);
  } catch (err) {
    console.log('The error is: ', err);
  }
};

getRenTrades();
