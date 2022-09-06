import instance from "./api";
// import LocalStorage from '../LocalStorage';

import { AxiosRequestHeaders } from "axios";
import transportsRoutes from "../../constants/routes/transportsRoutes";
import LocalStorage from "../../LocalStorage";

let token: string;
let header: AxiosRequestHeaders;

function updateHeader() {
  token = LocalStorage.getToken();

  header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export interface getTransportsRequest {
  coordinatesFrom: {
    lat: number;
    lng: number;
  };
  coordinatesTo: {
    lat: number;
    lng: number;
  };
}

export async function get(coordinates: getTransportsRequest) {
  updateHeader();

  const response = await instance.get(
    transportsRoutes.get.url + `/${coordinates}`,
    { headers: header }
  );
  return response.data;
}
