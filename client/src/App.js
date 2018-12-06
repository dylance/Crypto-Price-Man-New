import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BtcCard from './components/BtcCard'
import getJSON from './utils/getJSON';

class App extends Component {
  constructor(props) {
    super(props)
    this.tickerURL = '/api/coinbase/coins-ticker';
    this.statsURL = '/api/coinbase/coins-stats';
    this.state = {
      pricesTicker: [],
      pricesStats: []
    }
  }

  renderPrices() {
    console.log("prices rendered")
    return _.zipWith(this.state.pricesTicker, this.state.pricesStats, (ticker, stats) => {
      return <BtcCard key={ticker.coin} ticker={ticker} stats={stats}/>
    })
  }

  componentDidMount() {
    console.log("component mounted")
    Promise.all([
      getJSON(this.tickerURL), getJSON(this.statsURL)])
        .then(([coins, ticker]) => this.setState({pricesTicker: coins, pricesStats: ticker})
    );

    setInterval(() => {
      getJSON(this.tickerURL)
        .then(response => this.setState({pricesTicker: response}))
      }, 11000)
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        {this.renderPrices()}
      </React.Fragment>);
  }
}

export default App;
