import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../../utils/utils';

function SignOutLink({ className }) {
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {

    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavLink to="/signin" onClick={handleSignOut} className={className}>Sign Out</NavLink>  )
};

export default SignOutLink;