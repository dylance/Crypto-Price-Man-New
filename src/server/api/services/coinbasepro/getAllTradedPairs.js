const { makeCoinbaseProRequest } = require('./helpers');
const getAllTrades = require('./getAllTrades');

const getTradedPairs = async productIds => {
  const arrayChunks = [];
  let temporary = null;
  let chunkSize = 10;
  for (let i = 0; i < productIds.length; i += chunkSize) {
    temporary = productIds.slice(i, i + chunkSize);
    arrayChunks.push(temporary);
  }

  let interval = 0;
  const tradedPairs = await Promise.all(
    arrayChunks.map(async chunk => {
      interval += 1000;

      async function delay() {
        return new Promise(async function(resolve, reject) {

          setTimeout(async () => {
            let promises = chunk.map(async element => {
              return await getAllTrades(
                element.baseCurrency,
                element.quoteCurrency
              );
            });

            // Wait for all Promises to complete
            const ids = await Promise.all(promises);

            const filteredResults = ids.filter(result => {
              return result.length > 0;
            });

            const productIds = filteredResults.map(result => {
              return result[0].product_id;
            });

            resolve(productIds);
          }, interval);
        });
      }

      const values = await delay();

      return values;
    })
  );
  return tradedPairs.flat();
};

const getAllTradedPairs = async (currency = 'BTC') => {
  try {
    const path = `/products`;
    const method = 'GET';

    const { data: products } = await makeCoinbaseProRequest(path, method);

    const productIds = products
      .map(product => {
        return {
          baseCurrency: product.base_currency,
          quoteCurrency: product.quote_currency,
        };
      })
      .filter(({ quoteCurrency }) => {
        return quoteCurrency === 'BTC' || quoteCurrency === 'USD';
      });

    const tradedPairs = await getTradedPairs(productIds);


    console.log('The traded Pairs are: ', tradedPairs);
    console.log('The traded Pairs lengt is: ', tradedPairs.length);
  } catch (err) {
    console.log('The error is: ', err);
  }
};

getAllTradedPairs();

module.exports = getAllTradedPairs;
