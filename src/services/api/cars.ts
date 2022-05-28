import instance from './api';

import carsRoutes from '../../constants/routes/carsRoutes';
import { AxiosRequestHeaders } from 'axios';
import LocalStorage from '../../LocalStorage';

let token: string;
let header: AxiosRequestHeaders;

function updateHeader() {
  token = LocalStorage.getToken();

  header = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token
  }
}
export async function list() {
  updateHeader();

  const response = await instance.get(carsRoutes.list.url, { headers: header });

  return response.data;
}