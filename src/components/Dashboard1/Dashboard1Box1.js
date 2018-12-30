/*eslint-disable */
import React, { Component } from 'react';
import Box from '../base/Box';
import axios from 'axios';
import Select2 from './../base/Select';
import Table from './../base/Table';
import Select from 'react-select';

class Dashboard1Box1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: null,
      searchInterval: 'histoday',
      data: [],
      coins: [], // for select input
      limit: 24,
      clicked: false,
    }
  }

  getChangesPct = data => {
    let dataWithPriceChange = data.map(item => {
      let decrease = item.open - item.close;
      item["changePct"] = (-1 * decrease / item.open * 100) + '';

      return item;
    });

    return dataWithPriceChange;
  }

  handleSelectInterval = async value => {
    if (this.state.selectedOption != null) {
      const aggregate = value === 'histoday' ? '1' : (value === 'histohour' ? '3' : '10');

      const apiEndpoint = 'https://min-api.cryptocompare.com/data/'+ value +'?fsym=' + this.state.selectedOption.label + '&tsym=USD&limit=' + this.state.limit + '&aggregate=' + aggregate;

      let { data } = await axios.get(apiEndpoint);

      data = this.getFormatedDates(data, value);

      console.log(data);

      data = this.getChangesPct(data);

      data = data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      this.setState({ data, searchInterval: value });
    }
  }

  getFormatedDates = (data, value='') => {
    let dataWithDates = data.Data.map(item => {
      let time = item.time;
      let date = new Date(time * 1000).toISOString().substring(0, 10);
      var hours = new Date(time * 1000).getHours();
      var minutes = new Date(time * 1000).getMinutes();

      if (minutes < 10) minutes = "0" + minutes;

      if (value != '') {
        if (value === 'histoday') {
          item["date"] = date;
        } else if (value === 'histohour') {
          item["date"] = date + ' ' + hours + ':00';
        } else if (value === 'histominute') {
          item["date"] = date + ' ' + hours + ':' + minutes;
        }
      } else {
        if (this.state.searchInterval === 'histoday') {
          item["date"] = date;
        } else if (this.state.searchInterval === 'histohour') {
          item["date"] = date + ' ' + hours + ':00';
        } else if (this.state.searchInterval === 'histominute') {
          item["date"] = date + ' ' + hours + ':' + minutes;
        }
      }

      return item;
    });

    return dataWithDates;
  }

  componentDidMount() {
   let coins = ['BTC','ETH','EOS','XRP','LTC','BCH','ZEC','ETC','DASH','NEO','TRX','XLM','SNT','QTUM','USDT','ADA','PAX','HT','OMG','TUSD','GNT','BNB','TRUE','BSV','PIVX','MCO','WAVES','ONT','ZIL','OKB','XMR','HC','HSR','PAY','IOT','DOGE','TCH','ZRX','BTS','STRAT','TIX','MGO','IOST','NULS','VET','GTO','APIS','WTC','XEM','USDC','OCN','MITH','BAT','ICX','XAS','ABT','ARN','MER','KMD','NAS','LINK','QKC','SRN','CTXC','XVG','MDA','SYS','SWFTC','SC','BTG','REP','DCR','PRO','SALT','ETF','RDN','ENG','R','LSK','MTL','DENT','GTC','VIB','MANA','DGD','THETA','UTK','KNC','IOTX','AUTO','POWR','GRS'];

    let options = [];

    coins.forEach(item => {
      let obj = {};
      obj.label = item;
      obj.value = item;
      options.push(obj);
    });

    this.setState({ coins: options });
  }

  handleSelectCoin = async selectedOption => {

    const aggregate = this.state.searchInterval === 'histoday' ? '1' : (this.state.searchInterval === 'histohour' ? '3' : '10');

    const apiEndpoint = 'https://min-api.cryptocompare.com/data/'+ this.state.searchInterval +'?fsym=' + selectedOption.label + '&tsym=USD&limit=' + this.state.limit + '&aggregate=' + aggregate;

    let { data } = await axios.get(apiEndpoint);

    data = this.getFormatedDates(data);
    data = this.getChangesPct(data);

    data = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({ selectedOption, data });

    console.log('clicked');
  }

  handleClick = () => {
    let isClicked = !this.state.clicked;
    this.setState({ clicked: isClicked })
  }

  render() {
    const { searchInterval, data, selectedOption, coins, clicked } = this.state;

    return (
      <React.Fragment>
        <Box className={ clicked ? 'select-currency' : '' }>
          <div className="form">
            <Select2 value={ searchInterval } onChange={ this.handleSelectInterval } />
            <br />
            <br />

            <label>Select a coin:</label>
            <div className="select-wrapper" onClick={ this.handleClick }>
              <Select
                value={ selectedOption }
                onChange={ this.handleSelectCoin }
                options={ coins }
              />
            </div>

          </div>
        </Box>

        <Box>
          <Table data={ data } />
        </Box>
      </React.Fragment>
    );
  }
}

export default Dashboard1Box1;