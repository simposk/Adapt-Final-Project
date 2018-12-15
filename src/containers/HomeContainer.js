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

    // this.getData = this.getData.bind(this);
  }

  async componentDidMount() {
    // this.getData();
    let apiEndpoint = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,DOGE,EOS,LTC,XLM,ETC&tsyms=USD,EUR';
    try {
      const { data: raw } = await axios.get(apiEndpoint);

        let coinsArray = [];

        let coins = raw['RAW'];

        let obj = {
          coin: '',
          data: {},
        };

        for (var key in coins) { // eis per BTC, ETH, XRP
          let currencies = {};
          let raw = {};

          if (coins.hasOwnProperty(key)) {
            for (var secondKey in coins[key]) { // Eis per USD, EUR,
              for (var thirdKey in coins[key][secondKey]) { // Eis per RAW data
                raw[thirdKey] = coins[key][secondKey][thirdKey];
                // console.log(thirdKey + " : " + coins[key][secondKey][thirdKey]);
              }
              // currencies[secondKey] = coins[key][secondKey];
              currencies[secondKey] = raw;
            }

            obj = {
              coin: key,
              data: currencies,
            };
            coinsArray.push(obj);
          }
        }

        this.setState({ coins: coinsArray });
        console.log('Called getData()');

      // setInterval(async () => {
      //   const { data: coins } = await axios.get(apiEndpoint);

      //   let coinsArray = [];

      //   let obj = {
      //     coin: '',
      //     data: {},
      //   };

      //   for (var key in coins) {
      //     let currencies = {};

      //     if (coins.hasOwnProperty(key)) {

      //       for (var secondKey in coins[key]) {
      //         currencies[secondKey] = coins[key][secondKey];
      //       }
      //       obj = {
      //         coin: key,
      //         data: currencies,
      //       };
      //       coinsArray.push(obj);
      //     }
      //   }

      //   this.setState({ coins: coinsArray });
      //   console.log('Called getData()');
      // }, 10000);
    } catch(e) {
      console.log(e);
    }

  console.log(this.state.coins);
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
