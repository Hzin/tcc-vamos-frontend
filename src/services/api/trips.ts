import instance from "./api";

import tripsRoutes from "../../constants/routes/tripsRoutes";
import { ChangeTripStatusResponse, GetTripsFeedResponse } from "../functions/tripsService";
import { tripStatus } from "../../constants/tripStatus";
import { Trip } from "../../models/trip.model";

export async function getTripsByItineraryId(id_itinerary: string): Promise<Trip[]> {
  const finalUrl = tripsRoutes.getTripsByItineraryId.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl)
  return response.data;
}

export async function getTodaysTrips(): Promise<GetTripsFeedResponse[]> {
  const response = await instance.get(tripsRoutes.getTodaysTrips.url)
  return response.data;
}

export async function getNotTodaysTrips(): Promise<GetTripsFeedResponse[]> {
  const response = await instance.get(tripsRoutes.getNotTodaysTrips.url)
  return response.data;
}

export async function getTrip(tripId: string): Promise<Trip> {
  const response = await instance.get(tripsRoutes.getTrip.url + `/${tripId}`)
  return response.data;
}

export async function getTodaysTripByItineraryId(id_itinerary: string): Promise<tripStatus> {
  const finalUrl = tripsRoutes.getTodaysTripByItineraryId.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl)
  return response.data.data; // TODO, gambiarra
}

export async function getTodaysTripStatusByItineraryId(id_itinerary: string): Promise<tripStatus> {
  const finalUrl = tripsRoutes.getTodaysTripStatusByItineraryId.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl)
  return response.data.data; // TODO, gambiarra
}

export async function cancelTrip(itineraryId: string): Promise<ChangeTripStatusResponse> {
  const response = await instance.post(tripsRoutes.cancelTrip.url, { id_itinerary: itineraryId })
  return response.data;
}

export async function confirmTrip(itineraryId: string): Promise<ChangeTripStatusResponse> {
  const response = await instance.post(tripsRoutes.confirmTrip.url, { id_itinerary: itineraryId })
  return response.data;
}