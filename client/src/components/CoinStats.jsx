import React from 'react';
import { useParams } from 'react-router-dom';

import { AccountInfo } from './AccountInfo';

export const CoinStats = () => {
  const { coinName } = useParams(null);

  return (
    <div>
      <AccountInfo coin={coinName} baseCurrency="USD" />
      <AccountInfo coin={coinName} baseCurrency="BTC" />
    </div>
  );
};
