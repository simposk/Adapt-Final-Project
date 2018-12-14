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
  left: 0%;
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
          zoom: false,
          hover: false,
          moveDown: 0,
          cursorPosition: {
            top: 0,
            left: 0
          }
        };
      }

    // toggleZoom = () => {
    // const { zoom } = this.state;
    //     this.setState({
    //         zoom: !zoom
    //     });
    // };

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

    render() {
        const { videoUrl } = this.props;
        const { zoom, hover, cursorPosition, moveDown } = this.state;
        const motionStyle = zoom ? {
            videoSize: spring(100),
            triangleLeft: spring(-100)
        } : {
            videoSize: spring(70),
            triangleLeft: spring(-50)
        };

        return (
            <Container innerRef={(elem) => this.container = elem}>
        <Motion style={{ containerTop: spring(moveDown) }}>
          {({ containerTop }) =>
            <Container style={{
              position: 'absolute',
              top: containerTop
            }}>
              <Motion style={motionStyle}>
                {({ videoSize, triangleLeft }) =>
                  <PlayerContainer
                    onMouseMove={this.onMouseMove}
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.toggleZoom}
                    style={{
                      width: `${videoSize}%`,
                      cursor: zoom ? 'none' : 'pointer'
                      // Hide the cursor when it's zoomed.
                    }}>
                    <StyledSquareCursor show={zoom} style={{
                      top: cursorPosition.top,
                      left: cursorPosition.left,
                    }}/>
                    <StyledTriangle
                      hover={hover}
                      style={{
                        transform: `translate(${triangleLeft}%, -50%)`
                      }}/>
                    <ReactPlayer
                      width={'100%'}
                      height={'auto'}
                      playing
                      loop
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