import { MessageAndData } from "../../constants/responses/MessageAndData";
import { tripStatus } from "../../constants/tripStatus";
import { Itinerary } from "../../models/itinerary.model";
import { Trip } from "../../models/trip.model";
import { TripHistory } from "../../models/tripHistory.model";
import * as tripsRoutes from "../api/trips";

export interface GetTripsFeedResponse {
  itinerary: Itinerary;
  tripStatus: tripStatus;
  tripId?: string // vai ser trazido caso a viagem existir
  isPassenger: boolean;
}

export interface ChangeTripStatusResponse {
  data?: tripStatus;
}

export async function getTripsByItineraryId(
  id_itinerary: string
): Promise<Trip[]> {
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

export async function getTodaysTripStatusByItineraryId(
  itineraryId: string
): Promise<tripStatus> {
  let res: any;

  try {
    res = await tripsRoutes.getTodaysTripStatusByItineraryId(itineraryId);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function cancelTrip(
  itineraryId: string
): Promise<ChangeTripStatusResponse> {
  let res: any;

  try {
    res = await tripsRoutes.getTodaysTripStatusByItineraryId(itineraryId);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function confirmTrip(
  itineraryId: string
): Promise<ChangeTripStatusResponse> {
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
  userType: "driver" | "passenger";
  tripDay: "today" | "not_today";
}

export interface GetFeedPropsReturn {
  itinerary: Itinerary;
  itineraryInfoDriver?: string;
  itineraryInfoPassenger?: string;

  tripGoing: {
    status: tripStatus;
    id?: number; // é opcional porque a viagem pode ainda não ter sido criada
  };
  tripReturn?: {
    status: tripStatus;
    id?: number; // é opcional porque a viagem pode ainda não ter sido criada
  };
}

export async function getFeed({
  userType,
  tripDay,
}: GetFeedProps): Promise<GetFeedPropsReturn[]> {
  let res: any;

  try {
    res = await tripsRoutes.getFeed({ userType, tripDay });
  } catch (error) {
    // TODO
  }

  return res.data;
}

export interface CreateTripProps {
  itineraryId: string;
  tripType: string;
  newStatus: string;
}

export async function createTrip({
  itineraryId,
  tripType,
  newStatus,
}: CreateTripProps): Promise<GetFeedPropsReturn[]> {
  let res: any;

  try {
    res = await tripsRoutes.createTrip({ itineraryId, tripType, newStatus });
    console.log("res");
    console.log(res);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export interface UpdateTripStatusProps {
  tripId: string;
  newStatus: string;
  description: string;
}

export async function updateTripStatus({
  tripId,
  newStatus,
  description,
}: UpdateTripStatusProps): Promise<any> {
  let res: any;

  try {
    res = await tripsRoutes.updateTripStatus({
      tripId,
      newStatus,
      description,
    });
  } catch (error) {
    // TODO
  }

  return res.message;
}

export interface UndoLastStatusChangeProps {
  tripId: string;
}
export async function undoLastStatusChange({
  tripId,
}: UndoLastStatusChangeProps): Promise<MessageAndData> {
  let res: any;

  try {
    res = await tripsRoutes.undoLastStatusChange({ tripId });
  } catch (error) {
    // TODO
  }

  return res;
}

export interface getTripHistoricDataProps {
  tripId: string;
}
export async function getTripHistoricData({
  tripId,
}: getTripHistoricDataProps): Promise<TripHistory[]> {
  let res: any;

  try {
    res = await tripsRoutes.getTripHistoricData({ tripId });
  } catch (error) {
    // TODO
  }

  return res.data;
}
