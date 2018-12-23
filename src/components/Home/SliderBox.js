/* eslint-disable */
import React from 'react';
import Slider from './Slider';
import Box from '../base/Box';

const SliderBox = ({ data }) => (

  <Box>
    <div className="divider margin--small-bottom" />

    <div>
    <Slider slides={ data }></Slider>
    </div>

  </Box>
);

export default SliderBox;
