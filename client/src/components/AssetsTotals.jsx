import React from 'react';
import styled from 'styled-components';

import { getBaseCurrencyTotal } from '../util';

const TotalWrapper = styled.div`
  display: flex;
  justify-content: center;

  h3 {
    font-size: 36px;
    padding-left: 30px;
  }
`;

export const AssetsTotals = ({ assets = [] }) => {
  const usdTotal = getBaseCurrencyTotal(assets, 'USD');
  const btcTotal = getBaseCurrencyTotal(assets, 'BTC');

  return (
    <TotalWrapper>
      <h3>
        USD Total: $
        {usdTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </h3>
      <h3>
        BTC Total:
        {btcTotal.toFixed(4)}
      </h3>
    </TotalWrapper>
  );
};
