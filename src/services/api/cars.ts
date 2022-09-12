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

export async function listAllBrands() {
  updateHeader();

  const response = await instance.get(carsRoutes.listAllBrands.url, { headers: header });

  return response.data;
}

export async function listCarModels(carBrandId: string) {
  updateHeader();

  const response = await instance.get(carsRoutes.listCarModels.url + `/${carBrandId}`, { headers: header });

  return response.data;
}