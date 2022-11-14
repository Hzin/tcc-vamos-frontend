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

export async function getTripsByItineraryId(id_itinerary: string): Promise<Trip[]> {
  let res: any;

  try {
    res = await tripsRoutes.getTripsByItineraryId(id_itinerary);
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

// feed
export interface GetFeedProps {
  userType: 'driver' | 'passenger',
  tripDay: 'today' | 'not_today',
}

export interface GetFeedPropsReturn {
  itinerary: Itinerary;
  itineraryInfoDriver?: string,
  itineraryInfoPassenger?: string,

  tripGoing: {
    status: tripStatus;
    id?: number; // é opcional porque a viagem pode ainda não ter sido criada
  },
  tripReturn?: {
    status: tripStatus;
    id?: number; // é opcional porque a viagem pode ainda não ter sido criada
  }
}

export async function getFeed({ userType, tripDay }: GetFeedProps): Promise<GetFeedPropsReturn[]> {
  let res: any;

  try {
    res = await tripsRoutes.getFeed({ userType, tripDay });
  } catch (error) {
    // TODO
  }

  return res.data;
}

export interface UpdateTripStatusProps {
  itineraryId: string,
  tripType: 'going' | 'return',
  newStatus: tripStatus
}

export async function updateTripStatus({ itineraryId, tripType, newStatus }: UpdateTripStatusProps): Promise<GetFeedPropsReturn[]> {
  let res: any;

  try {
    res = await tripsRoutes.updateTripStatus({ itineraryId, tripType, newStatus });
  } catch (error) {
    // TODO
  }

  console.log(res)

  return res.data;
}