import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noPadding: PropTypes.bool,
};

const defaultProps = {
  className: '',
  noPadding: false,
};

const Box = (props) => {
  const { children, className, noPadding } = props;
  return (
    <div className={ classNames(className, 'box box--padding', { 'box--no-padding': noPadding }) }>
      { children }
    </div>
  );
};

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
