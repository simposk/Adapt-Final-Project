/* eslint-disable */
import React from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

class SelectDate extends React.Component {
    constructor(props) {
        super(props);
        
        let today = new Date();
        const nuo = today.getFullYear() + "." + parseInt(today.getMonth() + 1) + "." +  parseInt(today.getDate() + 1);
        let todayUnix = new Date(nuo).getTime() / 1000;

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            unixFrom: todayUnix,
            unixTo: todayUnix,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
   
    handleChange(date) {

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

    handleChange2(date) {
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

        console.log(data);
    }

    render() {
        console.log('from', this.state.unixFrom);
        console.log('to', this.state.unixTo);
      return (
          <React.Fragment>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleChange2}
            />
            <input type ="submit" style={{float: 'right'}} value='Update' onClick={ this.handleDateSearch }></input>
      </React.Fragment>
      );
    }
  }

export default SelectDate;
