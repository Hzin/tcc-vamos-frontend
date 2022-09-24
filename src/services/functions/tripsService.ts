import { tripStatus } from "../../constants/tripStatus";
import { Itinerary } from "../../models/itinerary.model";
import * as tripsRoutes from "../api/trips";

export interface GetTripsFeedResponse {
  itinerary: Itinerary;
  tripStatus: tripStatus;
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