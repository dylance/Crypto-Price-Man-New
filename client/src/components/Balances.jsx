import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Balances = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          '/api/coinbase/accounts?showAccountsWithBalance=true',
        );

        setAccounts([...res.data]);
      } catch (err) {
        console.log('The error is: ', err);
      }
    }
    fetchData();
  }, []);

  const [acounts, setAccounts] = useState([]);

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
            <th>Currency</th>
            <th>Balance</th>
            <th>Dollars</th>
          </tr>
        </thead>
        <tbody>
          {acounts.map(({ currency, balance }) => {
            return (
              <tr key={currency} style={{}}>
                <td>{currency} </td>
                <td>{balance.toFixed(2)}</td>
                <td>{balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
