// This code is copied from CI's Moments App Walkthrough Project

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import { useHistory } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const hasTokenStored = !!localStorage.getItem("refreshTokenTimestamp") 

  const handleMount = async () => {
    if (hasTokenStored) {
      try {
        const { data } = await axiosRes.get("dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        removeTokenTimestamp();
        history.push("/signin");
      }
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  // To keep the user logged in for 24 hours
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/signin');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        { children }
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};