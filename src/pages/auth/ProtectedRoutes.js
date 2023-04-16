import React from 'react'
import { Redirect } from 'react-router-dom';

export function ProtectedRoutes({ isLoggedIn, children }) {
    
  if (!isLoggedIn) {
      return <Redirect to="/signin" />;
    }
  return children

};