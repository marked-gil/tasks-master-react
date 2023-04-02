import jwtDecode from 'jwt-decode';

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