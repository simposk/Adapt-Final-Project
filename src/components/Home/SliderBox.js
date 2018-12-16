import React from 'react';
import paragraphImg from '../../assets/wireframes/paragraph.png';
import Slider from './Slider';
import Box from '../base/Box';
import { Link } from 'react-router-dom';
const slides = [
  {
    city: 'Paris',
    country: 'France',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg',
  },
  {
    city: 'Singapore',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg',
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg',
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg',
  },
  {
    city: 'Moscow',
    country: 'Russia',
    img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg',
  },
];

const SliderBox = () => (
  <Box>
    <div className="home-box__header">
      <h3>Slider</h3>
    </div>
    <div className="divider margin--small-bottom" />

    <div>
    <Slider slides={ slides }></Slider>
    </div>
    
  </Box>
);

export default SliderBox;
