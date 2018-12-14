import React from 'react';
import { Link } from 'react-router-dom';

import Columns from '../components/base/Columns';
import { TWO_COLUMNS_LAYOUTS } from '../constants/layouts';
import Dashboard2Box1 from '../components/Dashboard2/Dashboard2Box1';
import Dashboard2Box2 from '../components/Dashboard2/Dashboard2Box2';

const Dashboard2Container = () => (
  <div className="dashboard2">
    <div className="dashboard2__section dashboard2__section--left-link margin--small-bottom">
      <Link to="home">Go back</Link>
    </div>
    <Columns
      options={ TWO_COLUMNS_LAYOUTS }
    >
      <Dashboard2Box1 />
      <Dashboard2Box2 />
    </Columns>
  </div>
);

export default Dashboard2Container;
