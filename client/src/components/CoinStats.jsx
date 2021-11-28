import React from 'react';
import { useParams } from 'react-router-dom';

import { AllTrades } from './AllTrades';

export const CoinStats = () => {
  const { coinName } = useParams(null);

  return (
    <div>
      <AllTrades coin={coinName} baseCurrency="USD" />
      <AllTrades coin={coinName} baseCurrency="BTC" />
    </div>
  );
};
