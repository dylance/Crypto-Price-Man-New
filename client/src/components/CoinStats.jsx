import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { AllTrades } from './AllTrades';

export const CoinStats = () => {
  const { coinName } = useParams(null);
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <AllTrades coin={coinName} baseCurrency="USD" />
      <AllTrades coin={coinName} baseCurrency="BTC" />
    </div>
  );
};
