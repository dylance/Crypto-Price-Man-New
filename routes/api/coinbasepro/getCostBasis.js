const axios = require('axios');

const getAccessSign = require('./getAccessSign');
const getAccountID = require('./getAccountID');
const getExternalTransfers = require('./getExternalTransfers');
const getSumOfArrayValues = require('./getSumOfArrayValues');
const getRenTrades = require('./getRenTrades');
const {
  coinbaseProKey,
  coinbaseProPassphrase,
} = require('../../../config/keys');

const getCostBasis = async (coin = 'BTC', baseCurrency = 'USD') => {
  try {
    const accountID = await getAccountID(coin);
    console.log('The account id is: ', accountID);
    const deposits = await getExternalTransfers(coin, 'deposit');
    const btcDeposits = deposits
      .filter(deposit => {
        return deposit.account_id === accountID;
      })
      .map(deposit => {
        return {
          type: 'deposit',
          amount: deposit.amount,
          size: deposit.amount,
          created_at: deposit.created_at,
        };


      });
    //console.log("The eth deposits are: ", btcDeposits)
    const depositTotal = getSumOfArrayValues(btcDeposits, 'amount');
    //console.log('The btcDeposits are: ', btcDeposits);
    //console.log("The deposit total is: ", depositTotal);

    const withdrawals = await getExternalTransfers(coin, 'withdraw');
    const btcWithdrawals = withdrawals
      .filter(deposit => {
        return deposit.account_id === accountID;
      })
      .map(deposit => {
        return {
          type: 'withdraw',
          size: deposit.amount,
          amount: deposit.amount,
          created_at: deposit.created_at,
        };
      });

    //const withdrawalTotal = getSumOfArrayValues(btcWithdrawals, 'amount');
    // console.log('The btcWithdrawals are: ', btcWithdrawals);
    // console.log("The withdrawal total is: ", withdrawalTotal);

    const btcTrades = await getRenTrades(`${coin}-${baseCurrency}`);
    //console.log("The btc trades are: ", btcTrades);

    ///////////
    // run reduce on all trades to compare deposit and withdrawals and trade balances
    /////////////////////////////////////////////////
    //////////////////////////////
    ////////////////////////////////
    const btcBuys = btcTrades
      .filter(trade => {
        return trade.side === 'buy';
      })
      .map(trade => {
        return {
          created_at: trade.created_at,
          price: trade.price,
          size: trade.size,
          usdAmmount: parseFloat(trade.price) * parseFloat(trade.size),
          type: trade.side,
        };
      });

    const btcSells = btcTrades
      .filter(trade => {
        return trade.side === 'sell';
      })
      .map(trade => {
        return {
          created_at: trade.created_at,
          price: trade.price,
          size: trade.size,
          usdAmmount: parseFloat(trade.price) * parseFloat(trade.size),
          type: trade.side,
        };
      });
      console.log("The btc sells are: ", btcSells);

    // console.log("The buys are: ", btcBuys);
    // console.log("The sells are: ", btcSells);

    const allData = [
      ...btcDeposits,
      ...btcWithdrawals,
      ...btcBuys,
      ...btcSells,
    ];
    const sorted = allData.sort(function(a, b) {
      const isTrue = a.created_at > b.created_at;

      let startDate = new Date(a.created_at);

      let endDate = new Date(b.created_at);

      return startDate - endDate;
    });

    const totalShouldBe = sorted.reduce((acc, deposit) => {
      console.log("The acc is: ", acc);
      if (deposit.type === 'withdraw' || deposit.type === 'sell') {
        return acc - parseFloat(deposit.size);
      }
      if (deposit.type === 'deposit' || deposit.type === 'buy') {
        return acc + parseFloat(deposit.size);
      }
      console.log("********************************** un reachable code hit")
      return acc;
    }, 0);


    console.log("totalShouldBe is: ", totalShouldBe);
    console.log("Sorted is: ", sorted)

    return sorted;
    //console.log('All data is: ', sorted);

    // const path = `/transfers?type=deposit`;
    // //const path = `/accounts`;
    // const method = 'GET';
    // const { accessSign, timeStamp } = await getAccessSign(method, path);

    // const config = {
    //   method: method,
    //   url: `https://api.pro.coinbase.com${path}`,
    //   headers: {
    //     'CB-ACCESS-KEY': coinbaseProKey,
    //     'CB-ACCESS-SIGN': accessSign,
    //     'CB-ACCESS-TIMESTAMP': timeStamp,
    //     'CB-ACCESS-PASSPHRASE': coinbaseProPassphrase,
    //   },
    // };

    // const { data } = await axios(config);
  } catch (err) {
    console.log('The catch error is: ', err);
  }
};
module.exports = getCostBasis;

// Need to get deposits and trades. need to calculate average
// need cost basis from 3rd party deposits
// Get account ID of bitcoin
// Use account ID of bitcoin to get bitcoin deposits

// use this to get trades
// node getRenTrades.js
