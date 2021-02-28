import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import createFragment from 'react-addons-create-fragment';
import _ from 'lodash';

import Header from './components/Header';
import Exchanges from './components/Exchanges';
import PriceCard from './components/PriceCard';
import AccountInfo from './components/AccountInfo';
import getJSON from './utils/getJSON';

class App extends Component {
  constructor(props) {
    super(props);
    this.tickerURL = '/api/coinbase/coins-ticker';
    this.statsURL = '/api/coinbase/coins-stats';
    this.bittrexURL = '/api/bittrex/coins-ticker';
    this.poloniexURL = '/api/poloniex/coins-ticker';
    this.state = {
      pricesTicker: [],
      pricesStats: [],
      bittrexStats: [],
      poloniexStats: [],
    };
  }

  componentDidMount() {
    Promise.all([
      getJSON(this.tickerURL),
      getJSON(this.statsURL),
      getJSON(this.bittrexURL),
      getJSON(this.poloniexURL),
    ]).then(([coins, ticker, bittrex, poloniex]) =>
      this.setState({
        pricesTicker: coins,
        pricesStats: ticker,
        bittrexStats: bittrex,
        poloniexStats: poloniex,
      }),
    );

    // setInterval(() => {
    //   getJSON(this.tickerURL)
    //     .then(response => this.setState({pricesTicker: response}))
    //   }, 11000)
  }

  renderCoinbasePrices = () => {
    const { pricesTicker, pricesStats } = this.state;
    return createFragment({
      exchange: <h1 className="header-exchange">Coinbase</h1>,
      currencies: _.zipWith(pricesTicker, pricesStats, (ticker, stats) => {
        return ticker && stats ? (
          <PriceCard key={ticker.coin} ticker={ticker} stats={stats} />
        ) : null;
      }),
    });
  };

  renderBittrexPrices = () => {
    const { bittrexStats } = this.state;
    return createFragment({
      exchange: <h1 className="header-exchange">Bittrex</h1>,
      currencies: bittrexStats.map((ticker) => {
        return <PriceCard key={ticker.coin} ticker={ticker} />;
      }),
    });
  };

  renderPoloniexPrices = () => {
    const { poloniexStats } = this.state;
    return createFragment({
      exchange: <h1 className="header-exchange">Poloniex</h1>,
      currencies: poloniexStats.map((ticker) => {
        return <PriceCard key={ticker.coin} ticker={ticker} />;
      }),
    });
  };

  render() {
    return (
      <>
        <Header />
        <BrowserRouter>
          <div>
            <Exchanges />
            <AccountInfo />
            <div>
              <Route
                exact={true}
                path="/"
                render={() => this.renderCoinbasePrices()}
              />
              <Route
                exact={true}
                path="/bittrex"
                render={() => this.renderBittrexPrices()}
              />
              <Route
                exact={true}
                path="/poloniex"
                render={() => this.renderPoloniexPrices()}
              />
              <Route exact={true} path="/account" render={() => AccountInfo} />
            </div>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
