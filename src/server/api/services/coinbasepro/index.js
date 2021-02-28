/**
 * Get data from coinbase pro REST API
 */

const getAccessSign = require('./getAccessSign');
const getAccountID = require('./getAccountID');
const getAccounts = require('./getAccounts');
const getCandles = require('./getCandles');
const getCostBasis = require('./getCostBasis');
const getExternalTransfers = require('./getExternalTransfers');
const getProducts = require('./getProducts');
const getRenTrades = require('./getRenTrades');
const getSumOfArrayValues = require('./getSumOfArrayValues');
const getTimeStamp = require('./getTimeStamp');
const getTrades = require('./getTrades');
const viewUSDDeposits = require('./viewUSDDeposits');

module.exports = {
  getAccessSign,
  getAccountID,
  getAccounts,
  getCandles,
  getCostBasis,
  getExternalTransfers,
  getProducts,
  getRenTrades,
  getSumOfArrayValues,
  getTimeStamp,
  getTrades,
  viewUSDDeposits,
};
