/* eslint-disable */
import React, { Component } from "react";
import Box from "../base/Box";
import { LineChart, BarChart } from "react-easy-chart";
import Axios from "axios";
import _ from "lodash";
import SearchBox from './../base/SearchBox';

import DatePicker from "react-datepicker";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";

class Dashboard2Box1 extends Component {
  constructor(props) {
    super(props);

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);
    let today = Date.now();

    const initialWidth = window.innerWidth > 0 ? 949 : 600;

    this.state = {
      values: [],
      coins: [],
      clicked: false,
      selectedOption: null,
      currency: '',
      startDate: yesterday,
      endDate: new Date(),
      unixFrom: yesterday,
      unixTo: today,
      today: today,
      yesterday: yesterday,
      drawChart: false,
      drawVolume: false,
      windowWidth: initialWidth - 100,
    };
  }

  componentDidMount = () => {
    let coins = ['BTC','ETH','EOS','XRP','LTC','BCH','ZEC','ETC','DASH','NEO','TRX','XLM','SNT','QTUM','USDT','ADA','PAX','HT','OMG','TUSD','GNT','BNB','TRUE','BSV','PIVX','MCO','WAVES','ONT','ZIL','OKB','XMR','HC','HSR','PAY','IOT','DOGE','TCH','ZRX','BTS','STRAT','TIX','MGO','IOST','NULS','VET','GTO','APIS','WTC','XEM','USDC','OCN','MITH','BAT','ICX','XAS','ABT','ARN','MER','KMD','NAS','LINK','QKC','SRN','CTXC','XVG','MDA','SYS','SWFTC','SC','BTG','REP','DCR','PRO','SALT','ETF','RDN','ENG','R','LSK','MTL','DENT','GTC','VIB','MANA','DGD','THETA','UTK','KNC','IOTX','AUTO','POWR','GRS'];

    let options = [];

    coins.forEach(item => {
      let obj = {};
      obj.label = item;
      obj.value = item;
      options.push(obj);
    });

    this.setState({ coins: options });

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  handleSelectCoin = selectedOption => {
    this.setState({ selectedOption });
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth - 100 });
  }

  handleSelectDateFrom = date => {
    const demo = new Date(date);
    const nuo =
      demo.getFullYear() +
      "." +
      parseInt(demo.getMonth() + 1) +
      "." +
      parseInt(demo.getDate() + 1);
    var unixFrom = new Date(nuo).getTime() / 1000;

    let { endDate } = this.state;

    if (date < endDate){
      this.setState({
        unixFrom,
        startDate: date,
      })
    }

  };

  handleSelectDateTo = date => {
    const demo = new Date(date);
    const nuo =
      demo.getFullYear() +
      "." +
      parseInt(demo.getMonth() + 1) +
      "." +
      parseInt(demo.getDate() + 1);

    var unixTo = new Date(nuo).getTime() / 1000;

    const { startDate } = this.state;

    if (date > startDate){
      this.setState({
        unixTo,
        endDate: date,
      })
    }
  };

  handleChartSubmit = async () => {
    const { unixTo, startDate, endDate, selectedOption } = this.state;

    if (selectedOption != null) {
      var days = Math.floor(Math.abs(endDate - startDate) / 1000 / 86400);

      const apiEndpoint = "https://min-api.cryptocompare.com/data/histoday?fsym=" + selectedOption.label + "&tsym=USD&limit=" + days + "&toTs=" + unixTo;

      const { data } = await Axios.get(apiEndpoint);

      let values = _.values(data.Data);

      let lineValues = _.map(values, item => {
        let date = new Date(item.time * 1000).toISOString().substring(0, 10);
        return { x: date, y: item.close };
      });

      let volume = _.map(values, item => {
        let date = new Date(item.time * 1000).toISOString().substring(0, 10);
        return { x: date, y: item.volumeto };
      });

      this.setState({
        values: [lineValues],
        volume: volume,
        drawChart: true,
        drawVolume: true,
        currency: selectedOption,
      });
    }
  };

  handleSearch = query => {
    this.setState({ searchQuery: query.toUpperCase() });
  };

  handleClick = () => {
    let isClicked = !this.state.clicked;
    this.setState({ clicked: isClicked })
  }

  render() {
    const { startDate, endDate, yesterday, values, windowWidth, selectedOption, currency, volume, drawChart, drawVolume, coins, clicked } = this.state;

    console.log(JSON.stringify(volume));

    return (
      <React.Fragment>
        <Box className={ clicked ? 'select-currency' : '' }>
          <div className="chartForm__header">
            <h3>{ values.length > 0 ? currency.label + " Chart" : 'Chart'}</h3> <br/>

            <div className="select-wrapper" onClick={ this.handleClick }>
              <Select
                value={ selectedOption }
                onChange={ this.handleSelectCoin }
                options={ coins }
              />
            </div>

            {/* <SearchBox value={ searchQuery } onChange={ this.handleSearch } placeholder="BTC / ETH / XRP ..." /> <span>Currency</span> */}
          </div>

          <div className="datePicker__container">
            <div className="datePicker__wrapper--from">
              <DatePicker
                selected={ startDate }
                onChange={ this.handleSelectDateFrom }
                maxDate={ yesterday }
                showDisabledMonthNavigation
              /> <span>From</span>
            </div>

            <div className="datePicker__wrapper--to">
              <DatePicker
                selected={ endDate }
                onChange={ this.handleSelectDateTo }
                maxDate={new Date()}
              />  <span>To</span>
            </div>
          </div>

          <input
            className="button-submit"
            type="submit"
            value="Update"
            onClick={ this.handleChartSubmit }
          />
        </Box>
        { drawChart &&
          <Box>
            <div className="chart__container">
              <LineChart
                className="chart__container--chart"
                xType={ 'text' }
                axes={ (windowWidth) > 600 ? true : false }
                grid
                verticalGrid
                lineColors={ ['#3f51b5'] }
                interpolate={ 'cardinal' }
                width={ windowWidth }
                height={ windowWidth / 2}
                data={ values }
              />
            </div>
          </Box>
        }

        { drawVolume &&
          <div className="volume__container">
            <Box>
              <BarChart
                data={ volume }
                height={ 140 }
                width={ 500 }
                axes
                margin={{top: 0, right: 0, bottom: 40, left: 100}}
              />
            </Box>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default Dashboard2Box1;
