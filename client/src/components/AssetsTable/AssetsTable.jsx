import React from 'react';

import {
  BalancesHeaders, AssetName, AssetPrice, AssetValue,
} from '.';
import { TableWrapper } from './styled';

export const AssetsTable = ({ assets = [] }) => {
  return (
    <TableWrapper>
      <BalancesHeaders headers={['Asset', 'Amount', 'Price', 'Value']} />
      <tbody>
        {assets.map((account) => {
          const {
            currency, balance, BTCPrice, USDPrice,
          } = account;
          return (
            <tr key={currency}>
              <td>
                <AssetName currency={currency} />
              </td>
              <td>{balance.toFixed(2)}</td>
              <td>
                <AssetPrice USDPrice={USDPrice} BTCPrice={BTCPrice} />
              </td>
              <td>
                <AssetValue
                  USDPrice={USDPrice}
                  BTCPrice={BTCPrice}
                  balance={balance}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};
