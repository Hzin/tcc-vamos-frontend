import instance from "./api";
// import LocalStorage from '../LocalStorage';

import { AxiosRequestHeaders } from "axios";
import transportsRoutes from "../../constants/routes/itinerariesRoutes";
import LocalStorage from "../../LocalStorage";
import { SearchItinerariesRequest } from "../functions/itinerariesService";

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

export interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  formatted_address: string;
  lat: number;
  lng: number;
}

export interface CreateItineraryRequest {
  vehicle_plate: string;
  days_of_week?: string;
  specific_day?: string;
  estimated_departure_time: string;
  estimated_arrival_time: string;
  monthly_price: number;
  daily_price?: number;
  accept_daily: boolean;
  itinerary_nickname: string;
  estimated_departure_address: string;
  departure_latitude: number;
  departure_longitude: number;
  neighborhoods_served: Array<Address>;
  destinations: Array<Address>;
}

export async function getItineraries() {
  updateHeader();

  const response = await instance.get(transportsRoutes.get.url, {
    headers: header,
  });
  return response.data;
}

export async function create(itinerary: CreateItineraryRequest) {
  updateHeader();

  const response = await instance.post(transportsRoutes.create.url, itinerary, {
    headers: header,
  });
  return response.data;
}

export async function search(body: SearchItinerariesRequest
) {
  updateHeader();

  const response = await instance.post(
    transportsRoutes.search.url,
    body,
    { headers: header }
  );
  return response.data;
}
