/*eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from '../base/Box';

class PriceBox extends Component {
  render() {

    let { data } = this.props;

    return (
      <Box>
        <div className="home-box__header home-box__header--right-link">
          <h3>Price widget</h3>
          <Link to="dashboard1">See more</Link>
        </div>
        <div className="divider margin--small-bottom" />

        <div className="home-box__price-box">
          <table width="100%" className="rwd-table">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th className="change">Change</th>
              </tr>
              {data.slice(0, 5).map(item => (
                <tr key={item.coin}>
                  <td>{item.coin}</td>
                  <td>${item.data.USD.PRICE}</td>
                  <td className={item.data.USD.CHANGEPCT24HOUR.toFixed(2)[0] === '-' ? 'red' : 'green'} >{ item.data.USD.CHANGEPCT24HOUR.toFixed(2)[0] === '-' ? `${item.data.USD.CHANGEPCT24HOUR.toFixed(2)}% ▼` : `${item.data.USD.CHANGEPCT24HOUR.toFixed(2)}% ▲` }</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </Box>
    );
  }
};

export default PriceBox;
