import instance from "./api";

import { AxiosRequestHeaders } from "axios";
import tripsRoutes from "../../constants/routes/tripsRoutes";
import LocalStorage from "../../LocalStorage";
import { Trip } from "../../models/trip.model";
import { GetTripsFeedResponse } from "../functions/tripsService";

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

export async function getTodaysTrips(): Promise<GetTripsFeedResponse[]> {
  updateHeader();

  const response = await instance.get(tripsRoutes.getTodaysTrips.url, {
    headers: header,
  });
  return response.data;
}

export async function getNotTodaysTrips(): Promise<GetTripsFeedResponse[]> {
  updateHeader();

  const response = await instance.get(tripsRoutes.getNotTodaysTrips.url, {
    headers: header,
  });
  return response.data;
}