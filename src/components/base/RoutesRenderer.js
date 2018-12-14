import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  routes: PropTypes.array,
  context: PropTypes.object,
};

const defaultProps = {
  path: null,
  exact: false,
  routes: [],
  context: {},
};

const RoutesRenderer = ({
  path,
  routes,
  context,
  Component,
}) => (
  <Route
    path={ path }
    render={ props => (
      React.cloneElement(
        <Component
          { ...props }
          routes={ routes }
          context={ context }
        />,
      )
    ) }
  />
);

RoutesRenderer.propTypes = propTypes;
RoutesRenderer.defaultProps = defaultProps;

export default RoutesRenderer;
