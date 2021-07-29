const { makeCoinbaseProRequest } = require('./helpers');
const getAllTrades = require('./getAllTrades');

const getAccountID = async (currency = 'BTC') => {
  try {
    const path = `/accounts`;
    const method = 'GET';

    const { data: accounts } = await makeCoinbaseProRequest(path, method);
    return accounts;

    console.log('The accounts are: ', accounts);

    account = accounts.find(account => {
      return account.currency === currency;
    });

    return account.id;
  } catch (err) {
    //  console.log('The error is: ', err);
  }
};
module.exports = getAccountID;

const getItAll = async () => {
  const accounts = await getAccountID();

  // Map input data to an Array of Promises

  const arrayChunks = [];

  var i,
    j,
    temporary,
    chunk = 10;
  for (i = 0, j = accounts.length; i < j; i += chunk) {
    temporary = accounts.slice(i, i + chunk);
    arrayChunks.push(temporary);
  }
  console.log('arrayChunks.length is:  ', arrayChunks.length);
  let interval = 0;
  arrayChunks.forEach(chunk => {
    interval += 1000;

    setTimeout(() => {
      // bug lol
      console.log('The interval is: ', interval);

      let promises = chunk.map(element => {
        return getAllTrades(element.currency);
      });

      // Wait for all Promises to complete
      Promise.all(promises)
        .then(results => {
          const filteredResults = results.filter(result => {
            return result && result.length > 0;
          });

          const productIds = filteredResults.map(result => {
            return result[0].product_id;
          });
          console.log('The results are: ', productIds);
        })
        .catch(e => {
          console.error(e);
        });
    }, interval);
  });
};

//getItAll();
