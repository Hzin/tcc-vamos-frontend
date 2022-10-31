import { tripStatus } from "../../constants/tripStatus";
import { Itinerary } from "../../models/itinerary.model";
import { Trip } from "../../models/trip.model";
import * as tripsRoutes from "../api/trips";

export interface GetTripsFeedResponse {
  itinerary: Itinerary;
  tripStatus: tripStatus;
  tripId?: string // vai ser trazido caso a viagem existir
}

export interface ChangeTripStatusResponse {
  data?: tripStatus
}

export async function getTodaysTrips(): Promise<GetTripsFeedResponse[]> {
  let res: any;

  try {
    res = await tripsRoutes.getTodaysTrips();
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function getNotTodaysTrips(): Promise<GetTripsFeedResponse[]> {
  let res: any;

  try {
    res = await tripsRoutes.getNotTodaysTrips();
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function getTrip(tripId: string): Promise<Trip> {
  let res: any;

  try {
    res = await tripsRoutes.getTrip(tripId);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function getTodaysTripStatusByItineraryId(itineraryId: string): Promise<tripStatus> {
  let res: any;

  try {
    res = await tripsRoutes.getTodaysTripStatusByItineraryId(itineraryId);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function cancelTrip(itineraryId: string): Promise<ChangeTripStatusResponse> {
  let res: any;

  try {
    res = await tripsRoutes.getTodaysTripStatusByItineraryId(itineraryId);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function confirmTrip(itineraryId: string): Promise<ChangeTripStatusResponse> {
  let res: any;

  try {
    res = await tripsRoutes.getTodaysTripStatusByItineraryId(itineraryId);
  } catch (error) {
    // TODO
  }

  return res.data;
}