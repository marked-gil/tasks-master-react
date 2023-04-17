import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute (props) {
  
  const { 
    isLoggedIn,
    exact,
    path,
    render
  } = props;

  return (
    <>
      {isLoggedIn ? <Route exact={exact} path={path} render={render} /> : <Redirect to="/signin" replace />}
    </>
  )
};
