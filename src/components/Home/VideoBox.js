import React from 'react';
import Box from '../base/Box';

const VideoBox = () => (
  <Box>
    <div className="home-box__header">
      <h3>Cryptocurrency Explained</h3>
    </div>
    <div className="divider margin--small-bottom" />
    <div className="home-box__video-container">
      <iframe width="100%" height="100%" src="https://www.youtube.com/embed/HLYuxoytR3s" frameBorder={ 0 }
        title="video" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
  </Box>
);

export default VideoBox;
