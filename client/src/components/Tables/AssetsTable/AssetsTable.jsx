import React from 'react';

import { TableHeaders } from '..';
import { AssetName, AssetPrice, AssetValue } from '.';
import { TableWrapper } from './styled';

export const AssetsTable = ({ assets = [] }) => {
  return (
    <TableWrapper>
      <TableHeaders headers={['Asset', 'Amount', 'Price', 'Value']} />
      <tbody>
        {assets.map((account) => {
          const { currency, balance, BTCPrice, USDPrice } = account;
          return (
            <tr key={currency}>
              <td>
                <AssetName currency={currency} />
              </td>
              <td>
                {balance.toFixed(
                  currency === 'BTC' || currency === 'ETH' ? 3 : 2,
                )}
              </td>
              <td>
                <AssetPrice
                  USDPrice={USDPrice}
                  BTCPrice={BTCPrice}
                  currency={currency}
                />
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
