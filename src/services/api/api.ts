import axios from 'axios';
import apiConfig from '../../config/api.config';

const instance = axios.create({
  baseURL: apiConfig.getBaseUrl(),
});

export default instance;