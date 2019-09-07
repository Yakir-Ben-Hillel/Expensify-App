// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

const MapStateToProps = state => ({
  isAuthenticated: !!state.authentication.uid
});
export default connect(MapStateToProps)(PrivateRoute);
