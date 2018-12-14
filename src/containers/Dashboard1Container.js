import React from 'react';
import { Link } from 'react-router-dom';

import Columns from '../components/base/Columns';
import { TWO_COLUMNS_LAYOUTS } from '../constants/layouts';
import Dashboard1Box1 from '../components/Dashboard1/Dashboard1Box1';
import Dashboard1Box2 from '../components/Dashboard1/Dashboard1Box2';
import Dashboard1Box3 from '../components/Dashboard1/Dashboard1Box3';

const Dashboard1Container = () => (
  <div className="dashboard1">
    <div className="dashboard1__section dashboard1__section--left-link margin--small-bottom">
      <Link to="home">Go back</Link>
    </div>
    <Columns>
      <Dashboard1Box1 />
    </Columns>
    <Columns
      options={ TWO_COLUMNS_LAYOUTS }
    >
      <Dashboard1Box2 />
      <Dashboard1Box3 />
    </Columns>
  </div>
);

export default Dashboard1Container;
