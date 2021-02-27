import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountInfo = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('was the use effect called');
        const data = await axios.get('/api/coinbase/sorted');
        setTransactions(data.data);
        console.log('The data is: ', data);
      } catch (err) {
        console.log('The error is: ', err);
      }
    }
    fetchData();
  }, []);

  const [transactions, setTransactions] = useState([]);

  const getCostBasis = () => {
    console.log('This has been clicked');
    const transactionsWithPrices = transactions.map((transaction) => {
      if (transaction.type === 'deposit') {
        return {
          ...transaction,
          price: 140.0,
          size: parseFloat(transaction.size),
          usdAmmount: 140,
        };
      }
      return {
        ...transaction,
        price: parseFloat(transaction.price),
        size: parseFloat(transaction.size),
      };
    });
    console.log('Transactions with prices is: ', transactionsWithPrices);
    setTransactions(transactionsWithPrices);
  };

  const getAverages = () => {
    console.log('This has been clicked');
    let totalAtTheTime = 0;
    let totalBought = 0;
    let totalSold = 0;
    const transactionsWithPrices = transactions.map((transaction) => {
      const { type, size, usdAmmount } = transaction;
      if (type === 'deposit' || type === 'buy') {
        totalAtTheTime += parseFloat(size);
        totalBought += parseFloat(usdAmmount);
      }

      if (type === 'sell') {
        totalAtTheTime -= parseFloat(size);
        totalSold += parseFloat(usdAmmount);
      }
      return {
        ...transaction,
        totalAtTheTime: parseFloat(totalAtTheTime),
        totalBought: parseFloat(totalBought),
        totalSold: parseFloat(totalSold),
      };
    });
    setTransactions(transactionsWithPrices);
  };

  // cost basis / share
  // cost basis in dollars

  const objExample = {
    created_at: '2020-11-07T02:06:27.548Z',
    price: '464.00000000',
    size: '0.40933794',
    usdAmmount: 189.93280416000002,
    type: 'buy',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <table>
        <tr>
          <th>Date</th>
          <th>USD</th> <th>type</th> <th>price</th>
          <th>total at time</th>
          <th>total bought</th>
          <th>total sold</th>
          <th>cost / coin</th>
        </tr>

        {transactions.map((trans) => {
          return (
            <tr style={{}}>
              <td>{trans.created_at.substring(0, 10)} </td>
              <td>{parseFloat(trans.usdAmmount).toFixed(2)}</td>{' '}
              <td>{trans.type}</td>{' '}
              <td>{parseFloat(trans.price).toFixed(2)}</td>
              <td>{trans.totalAtTheTime && trans.totalAtTheTime.toFixed(2)}</td>
              <td>{trans.totalBought && trans.totalBought.toFixed(2)}</td>
              <td>{trans.totalSold && trans.totalSold.toFixed(2)}</td>
              <td>
                {(
                  (trans.totalBought - trans.totalSold) /
                  parseFloat(trans.totalAtTheTime)
                ).toFixed(2)}{' '}
              </td>
            </tr>
          );
        })}
      </table>
      <button onClick={getCostBasis}>get cost base</button>
      <button onClick={getAverages}>get cost base</button>
    </div>
  );
};

export default AccountInfo;
