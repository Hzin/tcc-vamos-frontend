import instance from './api';
import sessionRoutes from '../../constants/routes/sessionRoutes';
import LocalStorage from '../../LocalStorage';
import { AxiosRequestHeaders } from 'axios';

let token: string | null;
let header: AxiosRequestHeaders;

interface createData {
  login: string,
  password: string,
}

function updateHeader() {
  token = LocalStorage.getToken();
  header = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token
  }
}

export async function create(data: createData) {
  const response = await instance.post(sessionRoutes.create.url, data);
  return response.data;
}

export async function refresh() {
  updateHeader();
  
  let response = await instance.post(sessionRoutes.refresh.url, { token }, { headers: header });
  return response.data;
}