import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import createFragment from "react-addons-create-fragment";
import _ from 'lodash';
import Navbar from './components/Navbar';
import Header from './components/Header';
import PriceCard from './components/PriceCard'
import BittrexCard from './components/BittrexCard'
import getJSON from './utils/getJSON';

class App extends Component {
  constructor(props) {
    super(props)
    this.tickerURL = '/api/coinbase/coins-ticker';
    this.statsURL = '/api/coinbase/coins-stats';
    this.bittrexURL = '/api/bittrex/coins-ticker';
    this.state = {
      pricesTicker: [],
      pricesStats: [],
      bittrexStats: []
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

  componentDidMount() {
    console.log("component mounted")
    Promise.all([
      getJSON(this.tickerURL), getJSON(this.statsURL), getJSON(this.bittrexURL) ])
        .then(([coins, ticker, bittrex]) => this.setState({pricesTicker: coins, pricesStats: ticker, bittrexStats: bittrex })
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
            <Route exact={true} path="/" render={() =>this.renderCoinbasePrices()} />
            <Route exact={true} path="/bittrex" render={() => this.renderBittrexPrices()} />
          </div>
        </BrowserRouter>
      </React.Fragment>);
  }
}

export default App;
