import instance from './api';
// import LocalStorage from '../LocalStorage';

import transportsRoutes from '../../constants/routes/itinerariesRoutes';
import { AxiosRequestHeaders } from 'axios';
import LocalStorage from '../../LocalStorage';
import { setStore } from '../../store/RecordsStore';
import { searchItinerariesBody } from '../../models/searchItinerariesBody.model';

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

export async function search(body: searchItinerariesBody) {
  updateHeader();

  const response = await instance.post(transportsRoutes.search.url, body, { headers: header });
  return response.data;
}