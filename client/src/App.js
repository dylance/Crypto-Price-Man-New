import React, {Component} from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BtcCard from './components/BtcCard'
const iconPath = process.env.PUBLIC_URL + '/img/';

class App extends Component {
  constructor(props) {
    super(props)
    this.coinList = ['btc', 'eth', 'bch', 'ltc']

    this.state = {
      priceList: []
    }
  }

  renderPrices() {
    return this.state.priceList.map((item, key) => {
      return <BtcCard key={key} prices={item}/>
    })
  }

  componentDidMount() {
    const self = this
    const coinUrls = this.coinList.map(coin => {
      return `https://api.pro.coinbase.com/products/${coin}-usd/ticker`
    })

    axios.all(coinUrls.map(l => axios.get(l))).then(axios.spread((...res) => {
      return res.map((item, key) => {
        item.data.coin = self.coinList[key]
        return item.data
      })
    })).then(fun => {
      this.setState({priceList: fun})
    })

    axios.get('/api/coinbase/coins')
      .then(response => {
        console.log("The response is: ", response.data)
      })
      .catch(function (error) {
        console.log(error);
        return error
    });
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
