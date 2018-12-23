/* eslint-disable */
import React, { Component } from "react";
import Box from "../base/Box";
import { LineChart } from "react-easy-chart";
import Axios from "axios";
import _ from "lodash";
import SearchBox from './../base/SearchBox';

import DatePicker from "react-datepicker";
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
      searchQuery: '',
      currency: '',
      startDate: yesterday,
      endDate: new Date(),
      unixFrom: yesterday,
      unixTo: today,
      today: today,
      yesterday: yesterday,
      drawChart: false,
      windowWidth: initialWidth - 100,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
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
    const { unixTo, startDate, endDate, searchQuery } = this.state;

    if (searchQuery.length > 0) {
      var days = Math.floor(Math.abs(endDate - startDate) / 1000 / 86400);

      const apiEndpoint =
        "https://min-api.cryptocompare.com/data/histoday?fsym=" + searchQuery + "&tsym=USD&limit=" +
        days +
        "&toTs=" +
        unixTo;

      const { data } = await Axios.get(apiEndpoint);

      let values = _.values(data.Data);

      let lineValues = _.map(values, item => {
        let date = new Date(item.time * 1000).toISOString().substring(0, 10);
        return { x: date, y: item.close };
      });

      this.setState({
        values: [lineValues],
        drawChart: true,
        currency: searchQuery,
      });
    }
  };

  handleSearch = query => {
    this.setState({ searchQuery: query.toUpperCase() });
  };

  render() {
    const { startDate, endDate, yesterday, values, windowWidth, searchQuery, currency } = this.state;

    return (
      <React.Fragment>
        <Box>
          <div className="chartForm__header">
            <h3>{ values.length > 0 ? currency + " Chart" : 'Chart'}</h3> <br/>
            <SearchBox value={ searchQuery } onChange={ this.handleSearch } placeholder="BTC / ETH / XRP ..." /> <span>Currency</span>
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


        { this.state.drawChart &&
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
      </React.Fragment>
    );
  }
}

export default Dashboard2Box1;
