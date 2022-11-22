import instance from "./api";

import tripsRoutes from "../../constants/routes/tripsRoutes";
import { ChangeTripStatusResponse, CreateTripProps, GetFeedProps, GetTripsFeedResponse, UpdateTripStatusProps } from "../functions/tripsService";
import { tripStatus } from "../../constants/tripStatus";
import { Trip } from "../../models/trip.model";

export async function getTripsByItineraryId(id_itinerary: string): Promise<Trip[]> {
  const finalUrl = tripsRoutes.getTripsByItineraryId.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl)
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

export async function createTrip({ itineraryId, tripType, newStatus }: CreateTripProps): Promise<ChangeTripStatusResponse> {
  const finalUrl = tripsRoutes.createTrip.url.replace(':tripType', tripType).replace(':newStatus', newStatus)

  const response = await instance.post(finalUrl, { id_itinerary: itineraryId })
  return response.data;
}

export async function updateTripStatus({ tripId, newStatus, description }: UpdateTripStatusProps): Promise<ChangeTripStatusResponse> {
  const finalUrl = tripsRoutes.updateTripStatus.url.replace(':id', tripId).replace(':newStatus', newStatus)

  const response = await instance.post(finalUrl, { description })
  return response.data;
}

export async function getFeed({ userType, tripDay }: GetFeedProps): Promise<ChangeTripStatusResponse> {
  const finalUrl = tripsRoutes.getFeed.url.replace(':userType', userType).replace(':tripDay', tripDay)

  const response = await instance.get(finalUrl)
  return response.data;
}