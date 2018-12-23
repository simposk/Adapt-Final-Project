/*eslint-disable*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Columns from '../components/base/Columns';
import Dashboard1Box1 from '../components/Dashboard1/Dashboard1Box1';


class Dashboard1Container extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard1">
      <div className="dashboard1__section dashboard1__section--left-link margin--small-bottom">
        <Link to="home">Go back</Link>
      </div>
      <Columns>
        <Dashboard1Box1 />
      </Columns>
    </div>
    );
  }
}

export default Dashboard1Container;
