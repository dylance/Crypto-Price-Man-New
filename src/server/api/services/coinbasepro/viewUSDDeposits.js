const { makeCoinbaseProRequest } = require('./helpers');

const viewUSDDeposits = async () => {
  try {
    const afterDate = new Date('2021:01:01').toISOString(); //"2011-12-19T15:28:46.493Z"
    const path = `/transfers?type=deposit&before=${afterDate}`;

    const { data } = await makeCoinbaseProRequest(path);

    const deposits = data.filter(deposit => {
      return deposit.details.is_instant_usd === 'true';
    });

    const total = deposits.reduce((acc, deposit) => {
      return acc + parseFloat(deposit.amount);
    }, 0);

    deposits.forEach(deposit => {
      const depositDate = new Date(deposit.created_at).toDateString();
      console.log(`deposited ${parseFloat(deposit.amount)} on ${depositDate}`);
    });

    console.log('The number of deposits is: ', deposits.length);
    console.log('The total is: ', total);
  } catch (err) {
    console.log('The error is:', err);
  }
};

module.exports = viewUSDDeposits;
