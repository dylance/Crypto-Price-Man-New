import React from 'react';

import { Header, AccountInfo, Balances } from './components';

const App = () => {
  return (
    <>
      <Header />
      <Balances />
      <AccountInfo coin="BTC" baseCurrency="USD" />
      <AccountInfo coin="ETH" baseCurrency="USD" />
    </>
  );
};

export default App;
