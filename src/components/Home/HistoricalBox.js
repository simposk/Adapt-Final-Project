/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from 'react-easy-chart';
import Box from '../base/Box';

const HistoricalBox = ( { data } ) => (
  <Box>
    <div className="home-box__header home-box__header--right-link">
      <h3>Historical data widget</h3>
      <Link to="dashboard2">See more</Link>
    </div>

    <div className="divider margin--small-bottom" />
   <div className="chart__container">
   <div className="home-box_currency"> BTC </div>
      <LineChart
        className="chart__container--chart"
        xType={ 'text' }
        axes
        grid
        verticalGrid
        lineColors={ ['#3f51b5'] }
        interpolate={ 'cardinal' }
        width={ 650 }
        height={ 350 }
        data={ data }
      />
     </div>
  </Box>
);

export default HistoricalBox;
