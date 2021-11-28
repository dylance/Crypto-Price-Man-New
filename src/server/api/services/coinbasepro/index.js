/**
 * Get data from coinbase pro REST API
 */

const getAccountID = require('./getAccountID');
const getAccounts = require('./getAccounts');
const getCandles = require('./getCandles');
const getCostBasis = require('./getCostBasis');
const getExternalTransfers = require('./getExternalTransfers');
const getPriceTicker = require('./getPriceTicker');
const getProducts = require('./getProducts');
const getAllTrades = require('./getAllTrades');
const getTradesCostBasis = require('./getTradesCostBasis');
const getTrades = require('./getTrades');
const viewUSDDeposits = require('./viewUSDDeposits');
const getHistoricPrice = require('./getHistoricPrice');

module.exports = {
  getAccountID,
  getAccounts,
  getCandles,
  getCostBasis,
  getExternalTransfers,
  getPriceTicker,
  getProducts,
  getAllTrades,
  getTradesCostBasis,
  getTrades,
  viewUSDDeposits,
  getHistoricPrice,
};
