/* eslint-disable */
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

export default class CitiesSlider extends React.Component {
    constructor(props) {
      super(props);

      this.IMAGE_PARTS = 4;
      this.changeTO = null;
      this.AUTOCHANGE_TIME = 4000;

      this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }

    componentWillUnmount() {
      window.clearTimeout(this.changeTO);
    }

    componentDidMount() {
      this.runAutochangeTO();
      setTimeout(() => {
        this.setState({ activeSlide: 0, sliderReady: true });
      }, 0);
    }

    runAutochangeTO() {
      this.changeTO = setTimeout(() => {
        this.changeSlides(1);
        this.runAutochangeTO();
      }, this.AUTOCHANGE_TIME);
    }

    changeSlides(change) {
      window.clearTimeout(this.changeTO);
      const { length } = this.props.slides;
      const prevSlide = this.state.activeSlide;
      let activeSlide = prevSlide + change;
      if (activeSlide < 0) activeSlide = length - 1;
      if (activeSlide >= length) activeSlide = 0;
      this.setState( { activeSlide, prevSlide } );
    }

    render() {
      const { activeSlide, prevSlide, sliderReady } = this.state;
      return (
        <div className={classNames('slider', { 's--ready': sliderReady })}>
          <p className="slider__top-heading">CRYPTOCURRENCIES</p>
          <div className="slider__slides">
            { this.props.slides.map((slide, index) => (
              <div
                className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
                key={ slide.coin }
                >
                <div className="slider__slide-content">
                  <h3 className="slider__slide-subheading">${slide.data.USD.PRICE}</h3>
                  <h2 className="slider__slide-heading">
                    { slide.coin.split('').map(l => <span key={ Math.random() }>{l}</span>) }
                  </h2>
                  <Link to="dashboard2">
                  <p className="slider__slide-readmore">read more</p>
                  </Link>
                </div>
                <div className="slider__slide-parts">
                  {}
                </div>
              </div>
            )) }
          </div>
          <div className="slider__control" onClick={ () => this.changeSlides(-1) } />
          <div className="slider__control slider__control--right" onClick={ () => this.changeSlides(1) } />
        </div>
      );
    }
  }


