import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import createFragment from "react-addons-create-fragment";
import _ from 'lodash';

import Header from './components/Header';
import Exchanges from './components/Exchanges';
import PriceCard from './components/PriceCard';
import getJSON from './utils/getJSON';

class App extends Component {
  constructor(props) {
    super(props)
    this.tickerURL = '/api/coinbase/coins-ticker';
    this.statsURL = '/api/coinbase/coins-stats';
    this.bittrexURL = '/api/bittrex/coins-ticker';
    this.poloniexURL = '/api/poloniex/coins-ticker';
    this.state = {
      pricesTicker: [],
      pricesStats: [],
      bittrexStats: [],
      poloniexStats: []
    }
  }

  renderCoinbasePrices() {
    return createFragment({
      exchange: <h1 className="header-exchange">Coinbase</h1>,
      currencies: _.zipWith(this.state.pricesTicker, this.state.pricesStats, (ticker, stats) => {
        return <PriceCard key={ticker.coin} ticker={ticker} stats={stats}/>
      }
      )
    })
  }

  renderBittrexPrices() {
    return createFragment({
  exchange: <h1 className="header-exchange">Bittrex</h1>,
  currencies: this.state.bittrexStats.map(ticker => {
    return <PriceCard key={ticker.coin} ticker={ticker}/>
  }),
});
}

renderPoloniexPrices() {
  return createFragment({
exchange: <h1 className="header-exchange">Poloniex</h1>,
currencies: this.state.poloniexStats.map(ticker => {
  return <PriceCard key={ticker.coin} ticker={ticker}/>
}),
});

  }

  componentDidMount() {
    Promise.all([
      getJSON(this.tickerURL), getJSON(this.statsURL), getJSON(this.bittrexURL), getJSON(this.poloniexURL) ])
        .then(([coins, ticker, bittrex, poloniex]) => this.setState({
          pricesTicker: coins,
          pricesStats: ticker,
          bittrexStats: bittrex,
          poloniexStats: poloniex
        })
    );

    // setInterval(() => {
    //   getJSON(this.tickerURL)
    //     .then(response => this.setState({pricesTicker: response}))
    //   }, 11000)
  }

  render() {
    return (
      <React.Fragment>
        <Header/>

        <BrowserRouter>
          <div>
            <Exchanges/>
            <div>
              <Route exact={true} path="/" render={() =>this.renderCoinbasePrices()} />
              <Route exact={true} path="/bittrex" render={() => this.renderBittrexPrices()} />
              <Route exact={true} path="/poloniex" render={() => this.renderPoloniexPrices()} />
            </div>
          </div>
        </BrowserRouter>
      </React.Fragment>);
  }
}

export default App;
