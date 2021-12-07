import React from 'react';
import styled from 'styled-components';

import { formatCurrency } from '../../../util';

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:nth-child(2) {
    color: grey;
    font-size: 16px;
  }
`;

export const AssetValue = ({ USDPrice, BTCPrice, balance }) => {
  return (
    <PriceWrapper>
      <div>{formatCurrency(USDPrice * balance)}</div>
      <div>{formatCurrency(BTCPrice * balance, 6, 'BTC')}</div>
    </PriceWrapper>
  );
};
