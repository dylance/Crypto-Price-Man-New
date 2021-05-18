const util = require('util');

const getWalletID = require('./getWalletID');
const { makeCoinbaseRequest } = require('./helpers');

const convertTransType = transaction => {
  if (transaction === 'buy') {
    return 'bought';
  }
  if (transaction === 'pro_deposit') {
    return 'deposited';
  }
  if (transaction === 'pro_withdrawal') {
    return 'withdrew';
  }
  if (transaction === 'send') {
    return 'sent';
  }
  if (transaction === 'sell') {
    return 'sold';
  }
  return transaction;
};

const getTransactions = async (walletName = 'USD Wallet') => {
  try {
    const walletId = await getWalletID(walletName);

    const path = `/v2/accounts/${walletId}/transactions?limit=100`;
    const method = 'GET';

    const { data } = await makeCoinbaseRequest(path, method);

    const tradesThisYear = data.data.filter(trade => {
      let startDate = new Date('2020-08-01T00:00:00.000Z');
      //let endDate = new Date('2020-12-30T00:00:00.000Z');
      let endDate = new Date('2024-01-01T00:00:00.000Z');
      let tradeDate = new Date(trade.created_at);
      return tradeDate > startDate && tradeDate < endDate;
    });

    let sum = 0;

    tradesThisYear.forEach(trade => {
      if (trade.type === 'buy') {
        sum += parseFloat(trade.amount.amount);
      }
    });
    console.log('##### the sum is:  ', sum);

    const formattedTransactions = tradesThisYear.map(transaction => {
      return {
        type: transaction.type,
        status: transaction.status,
        amount: transaction.amount,
        native_amount: transaction.native_amount,
        created_at: transaction.created_at,
        to: transaction.to && transaction.to.resource,
      };
    });

    console.log('### the data length is: ', data.data.length);

    formattedTransactions.reverse().forEach(trans => {
      const depositDate = new Date(trans.created_at).toDateString();
      if (trans.type === 'buy') {
        console.log(
          `You ${convertTransType(trans.type).padStart(12, ' ')} ${parseFloat(
            trans.amount.amount
          ).toFixed(3)}${trans.amount.currency} on ${depositDate}`
        );
      }
    });

    //  console.log('The data is: ', util.inspect(data.data.reverse(), false, null, true));
    return data.data;
  } catch (err) {
    console.log('The error is: ', err);
  }
};

module.exports = getTransactions;

getTransactions('BTC Wallet');

const id = {
  id: '88bccbe5-baf4-5988-92cd-9299d4a53e31',
  type: 'send',
  status: 'completed',
  amount: { amount: '-0.06000000', currency: 'BTC' },
  native_amount: { amount: '-3197.38', currency: 'USD' },

  created_at: '2021-03-23T05:36:11Z',
  updated_at: '2021-03-23T06:20:54Z',
  resource: 'transaction',
  to: {
    resource: 'bitcoin_address',
    address: '3FZDyHtygNBj3Hsvc4tNEW4wauoFrjAiwp',
    currency: 'BTC',
    address_info: { address: '3FZDyHtygNBj3Hsvc4tNEW4wauoFrjAiwp' },
    address_url:
      'https://blockchain.info/address/3FZDyHtygNBj3Hsvc4tNEW4wauoFrjAiwp',
  },
  idem: '43cc1b38-cbaf-4377-a160-d49e1ac04763send',
  details: {
    title: 'Sent Bitcoin',
    subtitle: 'To Bitcoin address',
    header: 'Sent 0.0600 BTC ($3,197.38)',
    health: 'positive',
  },
  hide_native_amount: false,
};
