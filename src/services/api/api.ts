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
// , function (error) {
//   // Faz alguma coisa com o erro da requisição
//   return Promise.reject(error);
// });

// Adiciona um interceptador na resposta
// instance.interceptors.response.use(function (response) {
//   // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
//   // Faz alguma coisa com os dados de resposta
//   return response;
// }, function (error) {
//   // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
//   // Faz alguma coisa com o erro da resposta
//   return Promise.reject(error);
// });

export default instance;