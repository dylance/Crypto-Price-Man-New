import React from 'react';
import styled from 'styled-components';

import { PriceStats } from './PriceStats';
import { formatCurrency } from '../../util';

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  & > div:nth-child(2) {
    color: grey;
    font-size: 16px;
  }
`;

export const AssetPrice = ({ BTCPrice, USDPrice, currency }) => {
  return (
    <PriceWrapper>
      <div>
        {formatCurrency(USDPrice)}
        <PriceStats currency={currency} baseCurrency="USD" price={USDPrice} />
      </div>
      <div>
        {formatCurrency(BTCPrice, 6, 'BTC')}
        <PriceStats currency={currency} baseCurrency="BTC" price={BTCPrice} />
      </div>
    </PriceWrapper>
  );
};
