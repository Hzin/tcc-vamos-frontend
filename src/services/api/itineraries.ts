import instance from "./api";
// import LocalStorage from '../LocalStorage';

import { AxiosRequestHeaders } from "axios";
import transportsRoutes from "../../constants/routes/itinerariesRoutes";
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
  days_of_week: string;
  specific_day: string;
  estimate_departure_time: string;
  estimate_arrival_time: string;
  monthly_price: number;
  daily_price: number;
  itinerary_nickname: string;
  estimated_departure_address: string;
  departure_latitude: number;
  departure_longitude: number;
  neighboorhoods_served: Array<Address>;
  destinations: Array<Address>;
}

export async function get() {
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

export async function search(
  coordinatesOrigin: Coordinates,
  coordinatesDestination: Coordinates
) {
  updateHeader();

  const response = await instance.post(
    transportsRoutes.search.url,
    { coordinatesOrigin, coordinatesDestination },
    { headers: header }
  );
  return response.data;
}
