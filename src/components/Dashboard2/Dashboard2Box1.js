/* eslint-disable */
import React, { Component } from "react";
import Box from "../base/Box";
import paragraphImg from "../../assets/wireframes/paragraph.png";
// import Chart from './Chart';
import { LineChart } from "react-easy-chart";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

class Dashboard2Box1 extends Component {
  constructor() {
    super();

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);
    let today = Date.now();
    // const nuo =
    //   today.getFullYear() +
    //   "." +
    //   parseInt(today.getMonth() + 1) +
    //   "." +
    //   parseInt(today.getDate() + 1);
    // let todayUnix = new Date(nuo).getTime() / 1000;

    this.state = {
      values: [],
      startDate: yesterday,
      endDate: new Date(),
      unixFrom: yesterday,
      unixTo: today,
      today: today,
      yesterday: yesterday,
    };
  }

  getChartData = () => {};

  handleChange = date => {
    const demo = new Date(date);
    const nuo =
      demo.getFullYear() +
      "." +
      parseInt(demo.getMonth() + 1) +
      "." +
      parseInt(demo.getDate() + 1);
    var unixFrom = new Date(nuo).getTime() / 1000;

    let { unixTo, endDate } = this.state;
    
    if (date < endDate){
      this.setState({
        unixFrom,
        startDate: date,
      })
    }

  };

  handleChange2 = date => {
    const demo = new Date(date);
    const nuo =
      demo.getFullYear() +
      "." +
      parseInt(demo.getMonth() + 1) +
      "." +
      parseInt(demo.getDate() + 1);
    var unixTo = new Date(nuo).getTime() / 1000;

    const { endDate, unixFrom, startDate } = this.state;
    
    if (date > startDate){
      this.setState({
        unixTo,
        endDate: date,
      })
    }
  };

  handleDateSearch = async () => {
    const { unixTo, startDate, endDate } = this.state;

    var days = Math.floor(Math.abs(endDate - startDate) / 1000 / 86400);

    const apiEndpoint =
      "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=" +
      days +
      "&toTs=" +
      unixTo;

    const { data } = await Axios.get(apiEndpoint);

    let values = _.values(data.Data);

//     // Create a new JavaScript Date object based on the timestamp
// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
// var date = new Date(unix_timestamp*1000);
// // Hours part from the timestamp
// var hours = date.getHours();
// // Minutes part from the timestamp
// var minutes = "0" + date.getMinutes();
// // Seconds part from the timestamp
// var seconds = "0" + date.getSeconds();

// // Will display time in 10:30:23 format
// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


    let lineValues = _.map(values, item => {
      let date = new Date(item.time * 1000).toISOString().substring(0, 10);
      //WARNING! To be deprecated in React v17. Use componentDidMount instead.
      //console.log(date);
      return { x: date, y: item.close };
    });

    this.setState({
      values: [lineValues]
    });
  };

  mouseOverHandler = (d, e) => {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x});
  }

  mouseMoveHandler = (e) => {
    if (this.state.showToolTip) {
      this.setState({top: `${e.y - 10}px`, left: `${e.x + 10}px`});
    }
  }

  mouseOutHandler = () => {
    this.setState({showToolTip: false});
  }

  createTooltip = () => {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
            The x value is {this.state.x} and the y value is {this.state.y}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    //console.log(this.state.values);
    return (
      <React.Fragment>
        <Box>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={[new Date(), 5]}
            maxDate={this.state.yesterday}
            showDisabledMonthNavigation
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleChange2}
            minDate={[new Date(), 5]}
            maxDate={new Date()}
          />
          <input
            type="submit"
            style={{ float: "right" }}
            value="Update"
            onClick={this.handleDateSearch}
          />
        </Box>

        <Box>
          <LineChart
            xType={'text'}
            axes
            grid
            verticalGrid
            lineColors={['green']}
            interpolate={'cardinal'}
            width={450}
            height={450}
            data={this.state.values} />
        </Box>
      </React.Fragment>
    );
  }
}

export default Dashboard2Box1;
