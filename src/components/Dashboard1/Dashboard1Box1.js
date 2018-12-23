/*eslint-disable */
import React, { Component } from 'react';
import Box from '../base/Box';
import axios from 'axios';
import SearchBox from './../base/SearchBox';
import Select from './../base/Select';
import Table from './../base/Table';
class Dashboard1Box1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchInterval: 'histoday',
      data: [],
    }
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  getChangesPct = data => {
    let dataWithPriceChange = data.map(item => {
      let decrease = item.open - item.close;
      item["changePct"] = (-1 * decrease / item.open * 100) + "0";

      return item;
    });

    return dataWithPriceChange;
  }

  handleSelect = value => {
    this.setState({ searchInterval: value });
  }

  getDataFromApi = async () => {
    const limit = 24;

    const aggregate = this.state.searchInterval === 'histoday' ? '1' : (this.state.searchInterval === 'histohour' ? '3' : '10');

    const apiEndpoint = 'https://min-api.cryptocompare.com/data/'+ this.state.searchInterval +'?fsym=' + this.state.searchQuery + '&tsym=USD&limit=' + limit + '&aggregate=' + aggregate;

    const { data } = await axios.get(apiEndpoint);

    return data;
  }

  getFormatedDates = data => {
    let dataWithDates = data.Data.map(item => {
      let time = item.time;
      let date = new Date(time * 1000).toISOString().substring(0, 10);
      var hours = new Date(time * 1000).getHours();
      var minutes = new Date(time * 1000).getMinutes();

      if (minutes < 10) minutes = "0" + minutes;

      if (this.state.searchInterval === 'histoday') {
        item["date"] = date;
      } else if (this.state.searchInterval === 'histohour') {
        item["date"] = date + ' ' + hours + ':00';
      } else if (this.state.searchInterval === 'histominute') {
        item["date"] = date + ' ' + hours + ':' + minutes;
      }

      return item;
    });

    return dataWithDates;
  }

  handleSubmit = async () => {
    let data = await this.getDataFromApi();
    data = this.getFormatedDates(data);
    data = this.getChangesPct(data);

    data = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({ data, hasSelected: false })
  };

  render() {
    const { searchQuery, searchInterval, data } = this.state;

    return (
      <React.Fragment>
        <Box>
          <div className="form">
            <Select value={ searchInterval } onChange={ this.handleSelect } />
            <br />
            <SearchBox value={ searchQuery } onChange={ this.handleSearch } label="Search for a coin:" />
            <button onClick={ this.handleSubmit }>Search</button>
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
