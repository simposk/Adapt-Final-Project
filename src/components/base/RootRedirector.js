import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const RootRedirector = ({ to, location }) => (
  <Redirect to={ {
    pathname: to,
    state: { from: location },
  } }
  />
);

RootRedirector.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.object,
};

RootRedirector.defaultProps = {
  location: {},
};

export default RootRedirector;
