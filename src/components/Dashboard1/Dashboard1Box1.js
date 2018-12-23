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
    const limit = 24;

    // Group by how many
    const aggregate = this.state.searchInterval === 'histoday' ? '1' : (this.state.searchInterval === 'histohour' ? '3' : '10');
    const apiEndpoint = 'https://min-api.cryptocompare.com/data/'+ this.state.searchInterval +'?fsym=' + this.state.searchQuery + '&tsym=USD&limit=' + limit + '&aggregate=' + aggregate;
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
    }

    let sorted = dataOfDays.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({ data: sorted, hasSubmitted: true, hasSelected: false })
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
