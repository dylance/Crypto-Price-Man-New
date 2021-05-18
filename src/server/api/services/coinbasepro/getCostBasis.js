const getAccountID = require('./getAccountID');
const getExternalTransfers = require('./getExternalTransfers');
const { getSumOfArrayValues } = require('./helpers');
const getAllTrades = require('./getAllTrades');

const getCostBasis = async (coin = 'BTC', baseCurrency = 'USD') => {
  try {
    const accountID = await getAccountID(coin);

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

    const btcTrades = await getAllTrades(coin, baseCurrency);

    ///////////
    // run reduce on all trades to compare deposit and withdrawals and trade balances
    /////////////////////////////////////////////////

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

    const allData = [
      // @TODO fix below so its working :)
      //    ...btcDeposits,
      //  ...btcWithdrawals,
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
      if (deposit.type === 'withdraw' || deposit.type === 'sell') {
        return acc - parseFloat(deposit.size);
      }
      if (deposit.type === 'deposit' || deposit.type === 'buy') {
        return acc + parseFloat(deposit.size);
      }

      return acc;
    }, 0);



    const transactionsWithPrices = sorted.map(transaction => {
      if (transaction.type === 'deposit') {
        return {
          ...transaction,
          price: 140.0,
          size: parseFloat(transaction.size),
          usdAmmount: 140,
        };
      }

      if (transaction.type === 'withdraw') {
        return {
          ...transaction,
          price: 0,
          size: parseFloat(transaction.size),
          usdAmmount: 0,
        };
      }
      return {
        ...transaction,
        price: parseFloat(transaction.price),
        size: parseFloat(transaction.size),
      };
    });

    let totalAtTheTime = 0;
    let totalBought = 0;
    let totalSold = 0;
    const transactionsWithTotals = transactionsWithPrices.map(transaction => {
      const { type, size, usdAmmount } = transaction;
      if (type === 'deposit' || type === 'buy') {
        totalAtTheTime += parseFloat(size);
        totalBought += parseFloat(usdAmmount);
      }

      if (type === 'sell') {
        totalAtTheTime -= parseFloat(size);
        totalSold += parseFloat(usdAmmount);
      }

      if (type === 'withdraw') {
        totalAtTheTime -= parseFloat(size);
      }
      return {
        ...transaction,
        totalAtTheTime: parseFloat(totalAtTheTime),
        totalBought: parseFloat(totalBought),
        totalSold: parseFloat(totalSold),
      };
    });

    const objExample = {
      created_at: '2020-11-07T02:06:27.548Z',
      price: '464.00000000',
      size: '0.40933794',
      usdAmmount: 189.93280416000002,
      type: 'buy',
    };

    return transactionsWithTotals;
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
// node getAllTrades.js
