/* eslint-disable */
import React, { Component } from 'react';
import Box from '../base/Box';
import paragraphImg from '../../assets/wireframes/paragraph.png';
// import Chart from './Chart';
import { LineChart } from 'react-charts-d3';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from 'lodash';

class Dashboard2Box1 extends Component {
  constructor(){
    super();

    let today = new Date();
    const nuo = today.getFullYear() + "." + parseInt(today.getMonth() + 1) + "." +  parseInt(today.getDate() + 1);
    let todayUnix = new Date(nuo).getTime() / 1000;

    this.state = {
      values: [],
      startDate: new Date(),
      endDate: new Date(),
      unixFrom: todayUnix,
      unixTo: todayUnix,
    } 
  }



  getChartData = () => {

  }


  handleChange = date => {

    const demo = new Date(date);
    const nuo = demo.getFullYear() + "." + parseInt(demo.getMonth() + 1) + "." +  parseInt(demo.getDate() + 1);
    var unixFrom = new Date(nuo).getTime() / 1000;

    let { unixTo, endDate } = this.state;

    if(unixFrom < unixTo) {
        this.setState({
            startDate: date,
            unixFrom
        })
    } else {
        this.setState({
            startDate: endDate,
        }) 
    }
}

handleChange2 = date => {
    const demo = new Date(date);
    const nuo = demo.getFullYear() + "." + parseInt(demo.getMonth() + 1) + "." +  parseInt(demo.getDate() + 1);
    var unixTo = new Date(nuo).getTime() / 1000;

    const { unixFrom, startDate } = this.state;

    if (unixFrom < unixTo) {
        this.setState({
            endDate: date,
            unixTo
        })    
    } else {
        this.setState({
            endDate: startDate,
        }) 
    }
}

handleDateSearch = async () => {
    const { unixTo, startDate, endDate } = this.state;

    var days = Math.floor(Math.abs(endDate - startDate) / 1000 / 86400);

    const apiEndpoint = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=" + days + "&toTs=" + unixTo;

    const { data } = await Axios.get(apiEndpoint);

    let values = _.values(data.Data);

    let lineValues = _.map(values, item => {
        return {x: item.time, y: item.close}
    });

    let arrayOfLineValueObjects = [...lineValues];

    let lineChartData = {};
    lineChartData.key = 'Group 1';
    lineChartData.values = arrayOfLineValueObjects;

    console.log(lineChartData);

    this.setState({
        values: lineChartData,
    });
}

  render() {
    return (
      <React.Fragment>
        <Box>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
          <DatePicker
            selected={this.state.endDate}
            onChange={this.handleChange2}
          />
          <input type ="submit" style={{float: 'right'}} value='Update' onClick={ this.handleDateSearch }></input>
        </Box>
        
        <Box>
            <LineChart data = {this.state.values} />
        </Box>
      </React.Fragment>
      
    );
  }
}

export default Dashboard2Box1;
