import instance from './api';
// import LocalStorage from '../LocalStorage';

import transportsRoutes from '../../constants/routes/itinerariesRoutes';
import { AxiosRequestHeaders } from 'axios';
import LocalStorage from '../../LocalStorage';
import { setStore } from '../../store/RecordsStore';

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

export interface Coordinates {
  lat: number,
  lng: number
}

export async function get() {
  updateHeader();

  const response = await instance.get(transportsRoutes.get.url, { headers: header });
  return response.data;
}

export async function search(coordinatesOrigin: Coordinates, coordinatesDestination: Coordinates) {
  updateHeader();

  const response = await instance.post(transportsRoutes.search.url, { coordinatesOrigin, coordinatesDestination }, { headers: header });
  return response.data;
}