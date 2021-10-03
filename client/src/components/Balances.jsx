import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { BalancesHeaders, AssetsPieChart } from '../components';

const BalancesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
  padding-top: 80px;
  margin: auto;
  max-width: 1200px;
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: 0 auto;

  th,
  td {
    text-align: center;
    height: 42px;
    padding: 10px;
    font-size: 24px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

function reducer(state, action) {
  switch (action.type) {
    case 'setAccounts':
      return {
        accounts: action.data.map((data) => {
          return { ...data };
        }),
      };
    case 'setAccountPrice':
      const updatedAccounts = state.accounts.map((account) => {
        if (account.currency === action.data.currency) {
          return action.data.account;
        }

        return account;
      });

      return { accounts: updatedAccounts };
    default:
      throw new Error();
  }
}

export const Balances = () => {
  const [state, dispatch] = useReducer(reducer, { accounts: [] });
  //const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    async function getAccountsWithBalance() {
      try {
        const res = await axios.get(
          '/api/coinbase/accounts?showAccountsWithBalance=true',
        );

        dispatch({ data: res.data, type: 'setAccounts' });
      } catch (err) {
        console.log('The error is: ', err);
      }
    }
    getAccountsWithBalance();
  }, []);

  const getTotal = (accounts, currency) => {
    return accounts.reduce((previousValue, currentValue) => {
      if (currentValue.currency === currency) {
        return previousValue + (0 + currentValue.available);
      }
      if (currentValue[`${currency}Price`]) {
        return (
          previousValue +
          (0 + currentValue[`${currency}Price`]) * (0 + currentValue.available)
        );
      }
      return previousValue;
    }, 0);
  };

  return (
    <>
      <BalancesWrapper>
        <h3>USD Total: {getTotal(state.accounts, 'USD').toFixed(2)}</h3>
        <h3>BTC Total: {getTotal(state.accounts, 'BTC').toFixed(4)}</h3>
        <TableWrapper>
          <BalancesHeaders
            headers={[
              'Asset',
              'Amount',
              'USD Price',
              'USD Value',
              'BTC Price',
              'BTC Value',
            ]}
          />
          <tbody>
            {state.accounts.map((account) => {
              const { currency, balance } = account;
              return (
                <tr key={currency} style={{}}>
                  <td>{currency} </td>
                  <td>{balance.toFixed(3)}</td>
                  <td>{account.USDPrice ? account.USDPrice : '--.--'}</td>
                  <td>
                    {account.USDPrice
                      ? (
                          (0 + account.USDPrice) *
                          (0 + account.balance)
                        ).toFixed(2)
                      : '--.--'}
                  </td>
                  <td>{account.BTCPrice ? account.BTCPrice : '--.--'}</td>
                  <td>
                    {account.BTCPrice
                      ? (
                          (0 + account.BTCPrice) *
                          (0 + account.balance)
                        ).toFixed(4)
                      : '--.--'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableWrapper>
      </BalancesWrapper>
      <div style={{ width: '100vw', height: '700px' }}>
        <AssetsPieChart accounts={state.accounts} />
      </div>
    </>
  );
};
