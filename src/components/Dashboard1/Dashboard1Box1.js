/*eslint-disable */
import React, { Component } from 'react';
import Box from '../base/Box';
import axios from 'axios';
import SearchBox from './../base/SearchBox';
import Select from './../base/Select';

class Dashboard1Box1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      searchInterval: 'histoday',
      hasSubmitted: false,
      data: [],
    }
  }

  handleSearch = query => {
    this.setState({ searchQuery: query });
  };

  handleSelect = value => {
    this.setState({ searchInterval: value });
  }

  handleSubmit = async () => {
    const dataSize = this.state.searchInterval === 'histoday' ? '60' : (this.state.searchInterval === 'histohour' ? '180' : '600');
    console.log(dataSize);
    const apiEndpoint = 'https://min-api.cryptocompare.com/data/'+ this.state.searchInterval +'?fsym=' + this.state.searchQuery + '&tsym=USD&limit=' + dataSize;
    const { data } = await axios.get(apiEndpoint);

    const dataOfDays = data.Data;

    for (let i = 0; i < dataOfDays.length; i++) {
      // Pr01ice data
      let time = dataOfDays[i].time;
      let date = new Date(time * 1000).toISOString().substring(0, 10);
      var hours = new Date(time * 1000).getHours();
      var minutes = new Date(time * 1000).getMinutes();

      if (minutes < 10) minutes = "0" + minutes;

      if (this.state.searchInterval === 'histoday') {
        dataOfDays[i]["date"] = date;
      } else if (this.state.searchInterval === 'histohour') {
        dataOfDays[i]["date"] = date + ' ' + hours + ':00';
      } else if (this.state.searchInterval === 'histominute') {
        dataOfDays[i]["date"] = date + ' ' + hours + ':' + minutes;
      }

      // Price change in percentage
      let decrease = dataOfDays[i].open - dataOfDays[i].close;
      dataOfDays[i]["changePct"] = (-1 * decrease / dataOfDays[i].open * 100) + "0";
      // console.log(dataOfDays[i].changePct[0]);
    }

    let sorted = dataOfDays;

    // sort array by date so newest will be on top
    sorted = sorted.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // Add data accordingly to searchInterval
    let sortedData = [];

    if (this.state.searchInterval === 'histohour') {
      let ii = 0;
      for (let i = 0; i < sorted.length; i += 3) {
        sortedData[ii] = sorted[i];
        ii++;
      }
    } else if (this.state.searchInterval === 'histominute') {
      let ii = 0;
      for (let i = 0; i < sorted.length; i += 10) {
        sortedData[ii] = sorted[i];
        ii++;
      }
    } else {
      sortedData = sorted;
    }

    this.setState({ data: sortedData, hasSubmitted: true, hasSelected: false })
  };

  render() {
    const { searchQuery, searchInterval, data, hasSubmitted} = this.state;

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
          <table width="100%" className="rwd-table">
            <tbody>
              <tr className="table__header">
                <th>Date</th>
                <th>Price</th>
                <th className="change">Change</th>
              </tr>
              {data.length > 0 && data.map(item => (
                <tr key={item.time}>
                  <td>{item.date}</td>
                  <td>${item.close}</td>
                  <td className={item.changePct[0] === '-' ? 'red' : 'green'} >{ item.changePct[0] === '-' ? item.changePct.substring(0, 5) : item.changePct.substring(0, 4) }%</td>
                </tr>
              ))}

            </tbody>
          </table>
        </Box>
      </React.Fragment>
    );
  }
}

export default Dashboard1Box1;
