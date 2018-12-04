import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BtcCard from './components/BtcCard'
import testfunction from './utils/testfunction';
import getJSON from './utils/getJSON';
const iconPath = process.env.PUBLIC_URL + '/img/';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pricesTicker: [],
      pricesStats: []
    }
  }

  renderPrices() {
    return _.zipWith(this.state.pricesTicker, this.state.pricesStats, (ticker, stats) => {
      return <BtcCard key={ticker.coin} ticker={ticker} stats={stats}/>
    })
  }

  updatePrices() {
    return getJSON('/api/coinbase/coins-ticker').then(response =>{
      console.log(response)
      return response;
    })
  }

  componentDidMount() {
    Promise.all([
      getJSON('/api/coinbase/coins-ticker'), getJSON('/api/coinbase/coins-stats')])
        .then(([coins, ticker]) => this.setState({pricesTicker: coins, pricesStats: ticker})
    );

    setInterval(() => {
      this.updatePrices()
        .then(response => this.setState({pricesTicker: response}))
      }, 11000)
  }

  render() {
    return (<React.Fragment>
      <Header/>
      <div>{this.state.btcusd}</div>
      {this.renderPrices()}
    </React.Fragment>);
  }
}

export default App;
