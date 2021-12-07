import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { TradesTable } from './Tables/TradesTable';

export const CoinStats = () => {
  const { coinName } = useParams(null);
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.goBack()}>Back</button>
      <TradesTable coin={coinName} baseCurrency="USD" />
      <TradesTable coin={coinName} baseCurrency="BTC" />
    </div>
  );
};
