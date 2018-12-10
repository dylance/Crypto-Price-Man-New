import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import createFragment from "react-addons-create-fragment";
import _ from 'lodash';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Exchanges from './components/Exchanges';
import PriceCard from './components/PriceCard';
import BittrexCard from './components/BittrexCard';
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
    console.log("prices rendered")
    return _.zipWith(this.state.pricesTicker, this.state.pricesStats, (ticker, stats) => {
      return <PriceCard key={ticker.coin} ticker={ticker} stats={stats}/>
    })
  }

  renderBittrexPrices() {
    console.log("bittrex stats are",this.state.bittrexStats)
    return createFragment({
  date: <h1>Bittrex</h1>,
  lineComponent: this.state.bittrexStats.map(ticker => {
    return <PriceCard key={ticker.coin} ticker={ticker}/>
  }),
});
}

renderPoloniexPrices() {
  console.log("bittrex stats are",this.state.bittrexStats)
  return createFragment({
date: <h1>Poloniex</h1>,
lineComponent: this.state.poloniexStats.map(ticker => {
  return <PriceCard key={ticker.coin} ticker={ticker}/>
}),
});

  }

  componentDidMount() {
    console.log("component mounted")
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
        <Exchanges/>
        <BrowserRouter>
          <div>
            <Route exact={true} path="/" render={() =>this.renderCoinbasePrices()} />
            <Route exact={true} path="/bittrex" render={() => this.renderBittrexPrices()} />
            <Route exact={true} path="/poloniex" render={() => this.renderPoloniexPrices()} />
          </div>
        </BrowserRouter>
      </React.Fragment>);
  }
}

export default App;
