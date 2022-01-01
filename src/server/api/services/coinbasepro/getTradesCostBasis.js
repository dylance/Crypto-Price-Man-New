const getAccountID = require('./getAccountID');
const { getSumOfArrayValues } = require('./helpers');
const getAllTrades = require('./getAllTrades');

const getTradesCostBasis = async (coin = 'BTC', baseCurrency = 'USD') => {
  try {
    const trades = await getAllTrades(coin, baseCurrency);

    const tradesWithAmount = trades.map(trade => {
      baseCurrencySpent =
        trade.side === 'buy'
          ? parseFloat(trade.price) * parseFloat(trade.size)
          : parseFloat(trade.price) * parseFloat(trade.size) * -1;
      return {
        created_at: trade.created_at,
        price: trade.price,
        size: trade.side === 'buy' ? trade.size : trade.size * -1,
        baseCurrencySpent,
        type: trade.side,
      };
    });

    // sorts trades chronologically
    const sortedTrades = tradesWithAmount.sort((a, b) => {
      const startDate = new Date(a.created_at);
      const endDate = new Date(b.created_at);

      return startDate - endDate;
    });

    // converts price and size to floats
    const transactionsWithPrices = sortedTrades.map(transaction => {
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
      const { type, size, baseCurrencySpent } = transaction;
      if (type === 'buy') {
        totalAtTheTime += parseFloat(size);
        totalBought += parseFloat(baseCurrencySpent);
      }

      if (type === 'sell') {
        console.log("is this hit")
        totalAtTheTime += parseFloat(size);
        totalSold -= parseFloat(baseCurrencySpent);
        totalBought += parseFloat(baseCurrencySpent);
        console.log("total bought is: ", totalBought)
      }

      return {
        ...transaction,
        totalAtTheTime: parseFloat(totalAtTheTime),
        totalBought: parseFloat(totalBought),
        totalSold: parseFloat(totalSold),
      };
    });

    return transactionsWithTotals;
  } catch (err) {
    console.log('Error getting trades cost bases. Error: ', err);
  }
};

getTradesCostBasis('AVAX', 'BTC');
module.exports = getTradesCostBasis;

const tradeExample = {
  created_at: '2021-01-01T02:06:27.548Z',
  price: '464.00000000',
  size: '0.40933794',
  baseCurrencySpent: 189.93280416000002,
  type: 'buy',
};

// Need to get deposits and trades. need to calculate average
// need cost basis from 3rd party deposits
// Get account ID of bitcoin
// Use account ID of bitcoin to get bitcoin deposits
