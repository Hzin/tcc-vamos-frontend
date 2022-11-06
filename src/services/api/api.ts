import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import apiConfig from '../../config/api.config';
import LocalStorage from '../../LocalStorage';

let token: string;
let header: AxiosRequestHeaders;

const instance = axios.create({
  baseURL: apiConfig.getBaseUrl(),
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  token = LocalStorage.getToken();
  
  header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  config.headers = header;
  
  return config;
});

export default instance;