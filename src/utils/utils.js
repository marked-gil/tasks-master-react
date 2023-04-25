import jwtDecode from 'jwt-decode';
import { axiosReq } from '../api/axiosDefaults';

// Store the logged in user’s refresh token timestamp in the browser’s localStorage
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// returns a boolean; to refresh the access token only if the timestamp exists
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

// to remove the timestamp
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

// fetches more date for infinite scrolling
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {}
};