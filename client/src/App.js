import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BtcCard from './components/BtcCard'
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

  renderPrices() {
    console.log("prices rendered")
    return _.zipWith(this.state.pricesTicker, this.state.pricesStats, (ticker, stats) => {
      return <BtcCard key={ticker.coin} ticker={ticker} stats={stats}/>
    })
  }

  renderBittrex() {
    console.log("bittrex stats are",this.state.bittrexStats)
    return this.state.bittrexStats.map(ticker => {
      return <BittrexCard key={ticker.coin} ticker={ticker}/>
    })
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
        {this.renderPrices()}
        <h1 style={{color: 'green'}}>Bittrex</h1>
        {this.renderBittrex()}
      </React.Fragment>);
  }
}

export default App;
