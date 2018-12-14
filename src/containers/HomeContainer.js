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
  state = {
    coins: [],
  };

  async componentDidMount() {
    const { data: coins } = await axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,DOGE,XLM&tsyms=USD,EUR');

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

    console.log(coinsArray);

    // console.log(coinsArray);
  };

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
          <PriceBox/>

          <HistoricalBox />
        </Columns>
        <SliderBox />
      </div>
    );
  }
}

export default HomeContainer;
