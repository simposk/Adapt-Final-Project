/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import Triangle from './Triangle';
import SquareCursor from './SquareCursor';
import { Motion, spring } from 'react-motion';

const Container = styled.div`
  width: 100%;
  height: auto;
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

const StyledTriangle = styled(Triangle)`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translate(-50%, -50%);
`;
const StyledSquareCursor = styled(SquareCursor)`
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  // This is CRUCIAL. Since SquareCursor is inside PlayerContainer and the mouse is always on top of SquareCursor. We need this line to say that "Hey, nothing happens when the cursor is on top of SquareCursor. It's like the cursor is not even over the element!"
`;

export default class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hover: false,
          zoom: false,
          playing: false,
          moveDown: 0,
          cursorPosition: {
            top: 0,
            left: 0
          }
        };
      }

    toggleZoom = () => {
    const { zoom } = this.state;
        this.setState({
            zoom: !zoom,
        });
    };
    togglePlay = () => {
      const { playing } = this.state;
        this.setState({
          playing: !playing,
        })
    }
    onMouseOver = () => {
        this.setState({
          hover: true
        });
      };

      onMouseLeave = () => {
        this.setState({
          hover: false
        });
      };

      onMouseMove = (e) => {
        this.setState({
          cursorPosition: {
            top: e.clientY,
            left: e.clientX
          }
        });
      };

    render() {
        const { videoUrl } = this.props;
        const { playing, zoom, hover, cursorPosition, moveDown } = this.state;
        const motionStyle = zoom ? {
            //videoSize: spring(100),
            triangleLeft: spring(-100)
        } : {
            //videoSize: spring(100),
            triangleLeft: spring(-100)
        };

        //let displayType = playing ? 'none' : 'block';

        return (
            <Container innerRef={(elem) => this.container = elem}>
        <Motion style={{ containerTop: spring(moveDown) }}>
          {({ containerTop }) =>
            <Container>
              <Motion style={motionStyle}>
                {({ /*videoSize, */triangleLeft }) =>
                  <PlayerContainer
                    onMouseMove={this.onMouseMove}
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.togglePlay}
                    style={{
                     // width: `${videoSize}%`,
                      cursor: playing ? 'none' : 'pointer',
                      // Hide the cursor when it's zoomed.
                    }}>
                    <StyledSquareCursor show={hover ? playing : ''} style={{
                      top: cursorPosition.top,
                      left: cursorPosition.left,
                    }}
                    />
                    <StyledTriangle className = { playing ? 'StyledTriangle-disappear' : 'StyledTriangle-appear'}
                      hover={hover}
                      style={{
                        //display: playing ? 'none' : 'block',
                        transform: `translate(${triangleLeft}%, -50%)`,
                      }}/>
                    <ReactPlayer
                      width={'100%'}
                      height={'auto'}
                      playing = { playing }
                      url={videoUrl} />
                  </PlayerContainer>
                }
              </Motion>
            </Container>
          }
        </Motion>
      </Container>
    );
  }
}