import React, { Component } from 'react';

import Columns from '../components/base/Columns';
import axios from 'axios';

import {
  TWO_COLUMNS_60_40_LAYOUT,
  TWO_COLUMNS_LAYOUTS,
} from '../constants/layouts';
import VideoBox from '../components/Home/VideoBox';
import VideoText from '../components/Home/VideoText';
import PriceBox from '../components/Home/PriceBox';
import HistoricalBox from '../components/Home/HistoricalBox';
import SliderBox from '../components/Home/SliderBox';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    console.log('Called getData()');
    setInterval(function() {
      this.getData();
    }, 2000);
  };

  async getData() {
    const { data: coins } = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,DOGE,EOS,LTC,XLM,ETC,&tsyms=USD,EUR');

    let coinsArray = [];

    let obj = {
      coin: '',
      data: {},
    };

    for (var key in coins) {
      let currencies = {};

      if (coins.hasOwnProperty(key)) {

        for (var secondKey in coins[key]) {
          currencies[secondKey] = coins[key][secondKey];
        }
        obj = {
          coin: key,
          data: currencies,
        };
        coinsArray.push(obj);
      }
    }

    this.setState({ coins: coinsArray });
  }

  render() {
    return (
      <div className="home">
        <Columns
          options={ TWO_COLUMNS_60_40_LAYOUT }
          fill
        >
          <VideoBox />
          <VideoText />
        </Columns>
        <Columns
          options={ TWO_COLUMNS_LAYOUTS }
          fill
        >
          <PriceBox data={this.state.coins} />

          <HistoricalBox />
        </Columns>
        <SliderBox />
      </div>
    );
  }
}

export default HomeContainer;
