/**
 * Gets total from all crypto assets in USD or BTC
 *
 * @function
 * @param {object[]} assets - coinbase assets
 * @param {string} asset.currency - asset's name
 * @param {number} assets.balance - amount of that currency
 * @param {number} assets.<USD | BTC>Price - asset's price in USD or BTC
 * @param {string} baseCurrency - BTC or USD
 * @returns {number} - total off all assets in base currency
 *
 */

export const getBaseCurrencyTotal = (assets, baseCurrency = 'USD') => {
  return assets.reduce((sum, asset) => {
    const { currency, balance } = asset;
    const baseCurrencyAmount = currency === baseCurrency
      ? balance
      : (asset[`${ baseCurrency }Price`] || 0) * balance;
    return sum + baseCurrencyAmount;
  }, 0);
};
