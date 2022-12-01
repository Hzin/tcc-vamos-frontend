import instance from "./api";

import tripsRoutes from "../../constants/routes/tripsRoutes";
import { ChangeTripStatusResponse, CreateTripProps, GetFeedProps, getTripHistoricDataProps, GetTripsFeedResponse, UndoLastStatusChangeProps, UpdateTripStatusProps } from "../functions/tripsService";
import { tripStatus } from "../../constants/tripStatus";
import { Trip } from "../../models/trip.model";
import { MessageAndData } from "../../constants/responses/MessageAndData";
import { Data } from "../../constants/responses/Data";

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

  const response = await instance.patch(finalUrl, { description })
  return response.data;
}

export async function undoLastStatusChange({ tripId }: UndoLastStatusChangeProps): Promise<MessageAndData> {
  const finalUrl = tripsRoutes.undoLastStatusChange.url.replace(':id', tripId)

  const response = await instance.patch(finalUrl)
  return response.data;
}

export async function getTripHistoricData({ tripId }: getTripHistoricDataProps): Promise<Data> {
  const finalUrl = tripsRoutes.getTripHistoricData.url.replace(':id', tripId)

  const response = await instance.get(finalUrl)
  return response.data;
}

export async function getFeed({ userType, tripDay }: GetFeedProps): Promise<ChangeTripStatusResponse> {
  const finalUrl = tripsRoutes.getFeed.url.replace(':userType', userType).replace(':tripDay', tripDay)

  const response = await instance.get(finalUrl)
  return response.data;
}

export async function updatePresence(id_user: string, id_trip: number, status: "CONFIRMED" | "CANCELED"): Promise<any> {
  const response = await instance.patch(tripsRoutes.updatePresence.url, { id_user, id_trip, status })
  return response.data;
}

export async function getAttendanceList(id_trip: number): Promise<any> {
  const finalUrl = tripsRoutes.getAttendanceList.url.replace(':id', id_trip.toString())
  const response = await instance.get(finalUrl)
  return response.data;
}