/*eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Columns from '../components/base/Columns';
import axios from 'axios';
import { TWO_COLUMNS_LAYOUTS } from '../constants/layouts';
import Dashboard1Box1 from '../components/Dashboard1/Dashboard1Box1';
import Dashboard1Box2 from '../components/Dashboard1/Dashboard1Box2';
import Dashboard1Box3 from '../components/Dashboard1/Dashboard1Box3';

class Dashboard1Container extends Component{
  constructor(props) {
    super(props);
  }

  // async componentDidMount() {
  //   let apiEndpoint = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,XRP,ETH,USDT,XLM,EOS,LTC,DOGE,EOS,ETC,WAVES,TRX,ADA,DASH,NEO,XTZ,TUSD,USDC,BTG,VET,OMG,BAT,PAX,QTUM,ZRX,ONT,DCR,LSK,BCD,ZIL,NANO&tsyms=USD,EUR';
  //   try {
  //     const { data: raw } = await axios.get(apiEndpoint);

  //       let coinsArray = [];

  //       let coins = raw['RAW'];

  //       let obj = {
  //         coin: '',
  //         data: {},
  //       };

  //       for (var key in coins) { // eis per BTC, ETH, XRP
  //         let currencies = {};
  //         let raw = {};

  //         if (coins.hasOwnProperty(key)) {
  //           for (var secondKey in coins[key]) { // Eis per USD, EUR,
  //             for (var thirdKey in coins[key][secondKey]) { // Eis per RAW data
  //               raw[thirdKey] = coins[key][secondKey][thirdKey];
  //               // console.log(thirdKey + " : " + coins[key][secondKey][thirdKey]);
  //             }
  //             // currencies[secondKey] = coins[key][secondKey];
  //             currencies[secondKey] = raw;
  //           }

  //           obj = {
  //             coin: key,
  //             data: currencies,
  //           };
  //           coinsArray.push(obj);
  //         }
  //       }

  //       this.setState({ coins: coinsArray });
  //       console.log('Called getData()');

  //     setInterval(async () => {
  //       const { data: raw } = await axios.get(apiEndpoint);

  //       let coinsArray = [];

  //       let coins = raw['RAW'];

  //       let obj = {
  //         coin: '',
  //         data: {},
  //       };

  //       for (var key in coins) { // eis per BTC, ETH, XRP
  //         let currencies = {};
  //         let raw = {};

  //         if (coins.hasOwnProperty(key)) {
  //           for (var secondKey in coins[key]) { // Eis per USD, EUR,
  //             for (var thirdKey in coins[key][secondKey]) { // Eis per RAW data
  //               raw[thirdKey] = coins[key][secondKey][thirdKey];
  //               // console.log(thirdKey + " : " + coins[key][secondKey][thirdKey]);
  //             }
  //             // currencies[secondKey] = coins[key][secondKey];
  //             currencies[secondKey] = raw;
  //           }

  //           obj = {
  //             coin: key,
  //             data: currencies,
  //           };
  //           coinsArray.push(obj);
  //         }
  //       }

  //       this.setState({ coins: coinsArray });
  //       console.log('Called getData()');
  //     }, 10000);
  //   } catch(e) {
  //     console.log(e);
  //   }
  //   console.log(this.state.coins);
  // }

  render() {
    return (
      <div className="dashboard1">
      <div className="dashboard1__section dashboard1__section--left-link margin--small-bottom">
        <Link to="home">Go back</Link>
      </div>
      <Columns>
        <Dashboard1Box1 />
      </Columns>
      <Columns
        options={ TWO_COLUMNS_LAYOUTS }
      >
        {/* <Dashboard1Box2 /> */}
        {/* <Dashboard1Box3 /> */}
      </Columns>
    </div>
    );
  }
}

export default Dashboard1Container;
