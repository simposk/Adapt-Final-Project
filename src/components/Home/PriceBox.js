/*eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Box from '../base/Box';

class PriceBox extends Component {
  render() {

    let { data } = this.props;

    // console.log(data);
    // console.log(data[0].data.USD[CHANGEPCT24HOUR]);
    // console.log(data.data.USD.CHANGEPCT24HOUR);

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
                <th>Change</th>
              </tr>
              {data.map(item => (
                <tr key={item.coin}>
                  <td>{ item.coin }</td>
                  <td>${ item.data.USD.PRICE }</td>
                  <td id="change" >{ item.data.USD.CHANGEPCT24HOUR.toFixed(2) }%</td>
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
