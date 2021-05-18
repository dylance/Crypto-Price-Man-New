/**
 * Get data from coinbase pro REST API
 */

const getAccountID = require('./getAccountID');
const getAccounts = require('./getAccounts');
const getCandles = require('./getCandles');
const getCostBasis = require('./getCostBasis');
const getExternalTransfers = require('./getExternalTransfers');
const getProducts = require('./getProducts');
const getAllTrades = require('./getAllTrades');
const getTrades = require('./getTrades');
const viewUSDDeposits = require('./viewUSDDeposits');

module.exports = {
  getAccountID,
  getAccounts,
  getCandles,
  getCostBasis,
  getExternalTransfers,
  getProducts,
  getAllTrades,
  getTrades,
  viewUSDDeposits,
};
