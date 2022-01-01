/**
 * Get data from coinbase pro REST API
 */

const get24HourStats = require('./get24HourStats');
const getAccountID = require('./getAccountID');
const getAccounts = require('./getAccounts');
const getCandles = require('./getCandles');
const getCostBasis = require('./getCostBasis');
const getExternalTransfers = require('./getExternalTransfers');
const getPriceTicker = require('./getPriceTicker');
const getProducts = require('./getProducts');
const getAllTradedPairs = require('./getAllTradedPairs');
const getAllTrades = require('./getAllTrades');
const getTradesCostBasis = require('./getTradesCostBasis');
const getTrades = require('./getTrades');
const viewUSDDeposits = require('./viewUSDDeposits');
const getHistoricPrice = require('./getHistoricPrice');

module.exports = {
  get24HourStats,
  getAccountID,
  getAccounts,
  getCandles,
  getCostBasis,
  getExternalTransfers,
  getPriceTicker,
  getProducts,
  getAllTradedPairs,
  getAllTrades,
  getTradesCostBasis,
  getTrades,
  viewUSDDeposits,
  getHistoricPrice,
};
