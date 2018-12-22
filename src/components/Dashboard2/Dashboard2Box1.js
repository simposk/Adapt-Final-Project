/* eslint-disable */
import React, { Component } from 'react';

import Box from '../base/Box';
import paragraphImg from '../../assets/wireframes/paragraph.png';
import Chart from './Chart';

class Dashboard2Box1 extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
              181045,
              153060,
              106519,
              105162,
              95072
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Box>
          <form>
            Line chart title:<br/>
            <input type="text" name="Line chart title"/><br/>
          </form><br/>

          <label>
            Select currency:<br/>
          </label> 
          <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select> <br/> 
          <label>
          <br/>Select date FROM:<br/>
          </label>
          <input type="date"></input>
          <label>
          <br/><br/>Select date TO:<br/>
          </label>
          <input type="date"></input>
          <input type ="submit" style={{float: 'right'}} value='Update'></input>
        </Box>
        <Box>
            <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/><br/>
        </Box>
      </React.Fragment>
      
    );
  }
}

export default Dashboard2Box1;
