import axios from "axios";

// Unique URL for deployed API project
axios.defaults.baseURL = "https://tasks-master-api.herokuapp.com/";
// Data format API expects; multipart - due to images & texts in its request
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// To avoid CORS errors when sending cookies
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();