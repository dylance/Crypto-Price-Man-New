import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { BalancesHeaders } from './BalancesHeaders';

const TableWrapper = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 800px;

  th,
  td {
    text-align: left;
    padding: 10px;
    font-size: 24px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

export const AssetsTable = ({ assets = [] }) => {
  return (
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
        {assets.map((account) => {
          const { currency, balance } = account;
          return (
            <tr key={currency}>
              <td>
                <Link to={`/coin/${currency}`}>{currency}</Link>
              </td>
              <td>{balance.toFixed(3)}</td>
              <td>{account.USDPrice ? account.USDPrice : '--.--'}</td>
              <td>
                {account.USDPrice
                  ? ((0 + account.USDPrice) * (0 + account.balance)).toFixed(2)
                  : '--.--'}
              </td>
              <td>{account.BTCPrice ? account.BTCPrice : '--.--'}</td>
              <td>
                {account.BTCPrice
                  ? ((0 + account.BTCPrice) * (0 + account.balance)).toFixed(4)
                  : '--.--'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};
