const { makeCoinbaseProRequest } = require('./helpers');

const getTrades = async (tradePair = 'BTC-USD') => {
  try {
    const path = `/fills?product_id=${tradePair}`;

    const { data } = await makeCoinbaseProRequest(path);
    console.log('The data is: ', data);

    const tradesThisYear = data.filter(trade => {
      let startDate = new Date('2021-01-01T03:24:00');
      console.log('The start date is: ', startDate);
      let tradeDate = new Date(trade.created_at);
      return tradeDate < startDate && trade.side === 'buy';
    });

    const total = tradesThisYear.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.price) * parseFloat(deposit.size);
    }, 0);

    const amount = tradesThisYear.reduce((acc, deposit) => {
      console.log('The deposit amount is: ', deposit.amount);
      return acc + parseFloat(deposit.size);
    }, 0);

    const average = total / amount;

    console.log('The trades this year are: ', tradesThisYear);
    console.log('The total is: ', total);
    console.log('The amount is: ', amount);
    console.log('The average is: ', average);
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getTrades;
