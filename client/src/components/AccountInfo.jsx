import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AccountInfo = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('was the use effect called');
        const data = await axios.get(
          '/api/coinbase/sorted?coin=BTC&baseCurrency=USD',
        );
        setTransactions(data.data);
        console.log('The data is: ', data);
      } catch (err) {
        console.log('The error is: ', err);
      }
    }
    fetchData();
  }, []);

  const [transactions, setTransactions] = useState([]);

  // cost basis / share
  // cost basis in dollars

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '200px',
        paddingTop: '80px',
        margin: 'auto',
        maxWidth: '1200px',
      }}
    >
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>USD</th>
            <th>type</th>
            <th>price</th>
            <th>total at time</th>
            <th>total bought</th>
            <th>total sold</th>
            <th>cost / coin</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trans) => {
            return (
              <tr key={trans.created_at} style={{}}>
                <td>{trans.created_at.substring(0, 10)} </td>
                <td>{parseFloat(trans.usdAmmount).toFixed(2)}</td>
                <td>{trans.type}</td>
                <td>{parseFloat(trans.price).toFixed(2)}</td>
                <td>
                  {trans.totalAtTheTime && trans.totalAtTheTime.toFixed(2)}
                </td>
                <td>{trans.totalBought && trans.totalBought.toFixed(2)}</td>
                <td>{trans.totalSold && trans.totalSold.toFixed(2)}</td>
                <td>
                  {(
                    (trans.totalBought - trans.totalSold) /
                    parseFloat(trans.totalAtTheTime)
                  ).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AccountInfo;
