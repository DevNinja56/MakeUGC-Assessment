import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { getToken } from "./token";

export const BASE_URL = process.env.REACT_APP_REST_API_ENDPOINT;

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getToken() as string;
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use((res: AxiosResponse) => {
  return res.data! ?? res;
});

export default http;