import { Redirect, Route } from 'react-router-dom';

// Protects significant routes from the access of unauthenticated users
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
}
