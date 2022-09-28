import instance from "./api";

import { AxiosRequestHeaders } from "axios";
import tripsRoutes from "../../constants/routes/tripsRoutes";
import LocalStorage from "../../LocalStorage";
import { ChangeTripStatusResponse, GetTripsFeedResponse } from "../functions/tripsService";
import { tripStatus } from "../../constants/tripStatus";
import { Trip } from "../../models/trip.model";

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

export async function getTrip(tripId: string): Promise<Trip> {
  updateHeader();

  const response = await instance.get(tripsRoutes.getTrip.url + `/${tripId}`, {
    headers: header,
  });
  return response.data;
}

export async function getTodaysTripStatusByItineraryId(itineraryId: string): Promise<tripStatus> {
  updateHeader();

  const response = await instance.get(tripsRoutes.getTodaysTripStatusByItineraryId.url + `/${itineraryId}`, {
    headers: header,
  });

  return response.data.data; // TODO, gambiarra
}

export async function cancelTrip(itineraryId: string): Promise<ChangeTripStatusResponse> {
  updateHeader();

  const response = await instance.post(tripsRoutes.cancelTrip.url, { id_itinerary: itineraryId }, {
    headers: header,
  });

  return response.data;
}

export async function confirmTrip(itineraryId: string): Promise<ChangeTripStatusResponse> {
  updateHeader();

  const response = await instance.post(tripsRoutes.confirmTrip.url, { id_itinerary: itineraryId }, {
    headers: header,
  });

  return response.data;
}