/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  position: relative;
`;

const PlayerContainer = styled.div`
  position: relative;
  // We need this because we're gonna
  // have elements with "position: absolute"
  cursor: pointer;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;

`;

export default class Video extends Component {

    render() {
        const { videoUrl } = this.props;

        return (
            <div>
                        <ReactPlayer
                        width={'100%'}
                        height={'auto'}
                        playing
                        url={videoUrl}
                        />
            </div>
        );
    }
}