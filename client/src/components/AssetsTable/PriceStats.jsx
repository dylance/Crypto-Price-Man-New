import React from 'react';
import styled from 'styled-components';

import { fetchData } from '../../hooks/fetchData';

const PercentChangeWrapper = styled.span`
  font-size: 14px;
  padding-left: 8px;

  &.green {
    color: green;
  }

  &.red {
    color: red;
  }
`;
export const PriceStats = ({
  currency = 'ETH',
  baseCurrency = 'USD',
  price,
}) => {
  const [{ data: stats, isLoading }] = fetchData(
    `/api/coinbase/daily-stats?tradePair=${currency}-${baseCurrency}`,
  );

  if (currency === baseCurrency || currency === 'USD') return null;

  if (isLoading) {
    return <PercentChangeWrapper>loading...</PercentChangeWrapper>;
  }

  const percentChange = ((price - stats.open) / stats.open) * 100;

  return (
    <PercentChangeWrapper className={percentChange < 0 ? 'red' : 'green'}>
      {`${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`}
    </PercentChangeWrapper>
  );
};
