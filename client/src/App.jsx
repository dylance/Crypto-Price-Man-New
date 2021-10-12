import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Assets, CoinStats } from './components';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Assets} />
      <Route path="/coin/:coinName" component={CoinStats} />
    </Router>
  );
};

export default App;
