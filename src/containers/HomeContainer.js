import React, { Component } from 'react';
import Columns from '../components/base/Columns';
import axios from 'axios';
import _ from 'lodash';
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

    var apiTimeout;

    this.state = {
      values: [],
      drawChart: false,
      coins: [],
      apiTimeout,
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

        setTimeout(this.getDataFromApi, 10000);

        return coinsArray;
  }

  getDataForChart = async () => {
    const apiEndpoint = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=6';

    const { data } = await axios.get(apiEndpoint);

    let values = _.values(data.Data);

    let lineValues = _.map(values, item => {
      let date = new Date(item.time * 1000).toISOString().substring(0, 10);
      return { x: date, y: item.close };
    });
    //console.log(lineValues);
    this.setState({
        values: [lineValues],
        drawChart: true,
      });
  }

  async componentDidMount() {
      await this.getDataFromApi();
      await this.getDataForChart();
      let apiTimeout = setTimeout(this.getDataFromApi, 10000);
      this.setState({ apiTimeout });
  }

  componentWillUnmount() {
   // clearInterval(apiCall);
   clearTimeout(this.state.apiTimeout);
  }

  render() {
    const { values } = this.state;
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
          <HistoricalBox data={ values }/>
        </Columns>
        <SliderBox data={ this.state.coins }/>
      </div>
    );
  }
}

export default HomeContainer;
