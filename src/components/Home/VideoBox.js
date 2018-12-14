/* eslint-disable*/
import React, { Component, PropTypes } from 'react';
import Video from './Video';
import Box from '../base/Box';
//......
class VideoBox extends Component {
  render () {
    return (
      <Box>
        {
        <Video videoUrl={require("../../assets/videos/BTC.mp4")}></Video>
        }
      </Box>
    )
  }
};

export default VideoBox;
