const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getRenTrades = async (tradingPair) => {
  try {
    const path = `/fills?product_id=${tradingPair}`;
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
    //console.log('Te data is: ', data);

    const tradesThisYear = data.filter(trade => {
      let startDate = new Date('2020:01:01');
      let tradeDate = new Date(trade.created_at);
      return tradeDate > startDate;
    });

    return tradesThisYear;

    const buys = tradesThisYear.filter(trade => {
      return trade.side === 'buy';
    });

    const sells = tradesThisYear.filter(trade => {
      return trade.side === 'sell';
    });

    //     price: '49200.00000000',
    // size: '0.01000001',

    const total = buys.reduce((acc, deposit) => {
      return acc + parseFloat(deposit.price) * parseFloat(deposit.size);
    }, 0);

    const amount = buys.reduce((acc, deposit) => {
      return acc + parseFloat(deposit.size);
    }, 0);

    const average = total / amount;

    //console.log("The trades this year are: ", buys);
    console.log('The Buy total is: ', total);
    console.log('The Buy amount is: ', amount);
    console.log('The Buy average is: ', average);

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
    console.log('The Sell total is: ', total2);
    console.log('The Sell amount is: ', amount2);
    console.log('The Sell average is: ', average2);

    data.forEach(trade => {
      const depositDate = new Date(trade.created_at).toDateString();
      const moneySpent = parseFloat(trade.price) * parseFloat(trade.size);
      console.log(
        `you ${trade.side === 'buy' ? 'bought' : 'sold'} ${parseFloat(
          trade.size
        )} at ${parseFloat(trade.price)} for ${moneySpent} on ${depositDate}`
      );
    });

    //console.log('The data is: ', data);
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getRenTrades;

//const depositDate = new Date(deposit.created_at).toDateString();

//
// const sampleObj = {
//   created_at: '2021-02-14T10:10:05.725Z',
//   trade_id: 132713723,
//   product_id: 'BTC-USD',
//   order_id: '724e3a9f-0598-485d-a9bf-0439f0c05283',
//   user_id: '585cd15d55a99d50cc969ca0',
//   profile_id: 'c5095852-a42d-45a6-91a0-2cfb60f8e14b',
//   liquidity: 'M',
//   price: '49200.00000000',
//   size: '0.01000001',
//   fee: '1.7220017220000000',
//   side: 'buy',
//   settled: true,
//   usd_volume: '492.0004920000000000'
// },

//getRenTrades();
