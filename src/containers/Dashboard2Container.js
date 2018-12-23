/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

import Columns from '../components/base/Columns';
import Dashboard2Box1 from '../components/Dashboard2/Dashboard2Box1';

const Dashboard2Container = () => (
  <div className="dashboard2">
    <div className="dashboard2__section dashboard2__section--left-link margin--small-bottom">
      <Link to="home">Go back</Link>
    </div>
    <Columns>
      <Dashboard2Box1 />
    </Columns>
  </div>
);

export default Dashboard2Container;
