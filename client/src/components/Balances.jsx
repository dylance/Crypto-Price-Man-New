import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { CurrencyPrice } from '../components';

export const Balances = () => {
  useEffect(() => {
    async function getAccountsWithBalance() {
      try {
        const res = await axios.get(
          '/api/coinbase/accounts?showAccountsWithBalance=true',
        );

        setAccounts([...res.data]);
      } catch (err) {
        console.log('The error is: ', err);
      }
    }
    getAccountsWithBalance();
  }, []);

  const [acounts, setAccounts] = useState([]);
  console.log('The accounts are: ', acounts);

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
            <th>USD Price</th>
            <th>BTC Price</th>
          </tr>
        </thead>
        <tbody>
          {acounts.map(({ currency, balance }) => {
            return (
              <tr key={currency} style={{}}>
                <td>{currency} </td>
                <td>{balance.toFixed(2)}</td>
                <td>
                  <CurrencyPrice currency={currency} />
                </td>
                <td>
                  <CurrencyPrice currency={currency} baseCurrency="BTC" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
