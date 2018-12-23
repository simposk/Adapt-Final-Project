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

  getDataFromApi = async () => {
    let apiEndpoint = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP,ETH,USDT,XLM,EOS,LTC,DOGE,EOS,ETC,WAVES,TRX,ADA,DASH,NEO,XTZ,TUSD,USDC,BTG,VET,OMG,BAT,PAX,QTUM,ZRX,ONT,DCR,LSK,BCD,ZIL,NANO&tsyms=USD,EUR';

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
        // this.setState({ coins: coinsArray });
        // console.log('Called getData()');
        this.setState({ coins: coinsArray });

        return coinsArray;
  }

  async componentDidMount() {
      let data = await this.getDataFromApi();
      let apiCall = setInterval(this.getDataFromApi(), 10000); // Pakeisti setTimeout vietoj setInterval
  }

  componentWillUnmount() {
   // clearInterval(apiCall);
  }

  render() {
    console.log(this.state.coins);
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
          <PriceBox data={ this.state.coins } />
          <HistoricalBox />
        </Columns>
        <SliderBox data={ this.state.coins }/>
      </div>
    );
  }
}

export default HomeContainer;
