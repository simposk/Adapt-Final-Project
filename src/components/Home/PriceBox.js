/*eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from '../base/Box';

class PriceBox extends Component {
  state = {
    coins: [
      {
        name: 'Bitcoin',
        data: {
          usd: 10,
        },
      },
      {
        name: 'etherum',
        data: {
          usd: 10,
        },
      },
    ],
  };

  render() {
    // const {data: coins} = this.props;

    return (

      <Box>
        <div className="home-box__header home-box__header--right-link">
          <h3>Price widget</h3>
          <Link to="dashboard1">See more</Link>
        </div>
        <div className="divider margin--small-bottom" />
      </Box>
    );
  }
};

export default PriceBox;
