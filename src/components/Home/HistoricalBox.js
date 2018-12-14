import React from 'react';
import { Link } from 'react-router-dom';
import paragraphImg from '../../assets/wireframes/paragraph.png';

import Box from '../base/Box';

const HistoricalBox = () => (
  <Box>
    <div className="home-box__header home-box__header--right-link">

      <h3>Historical data widget</h3>
      <Link to="dashboard2">See more</Link>
    </div>
    <div className="divider margin--small-bottom" />
    <img
      className="home__wireframe-img"
      src={ paragraphImg }
    />
  </Box>
);

export default HistoricalBox;
