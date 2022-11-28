import { tripStatus } from "../constants/tripStatus";
import { Itinerary } from "./itinerary.model";
import { TripHistory } from "./tripHistory.model";
import { TripType } from "./tripType.models";

export interface Trip {
  id_trip: number;
  itinerary_id: number;
  nickname: string;
  date: string;
  status: tripStatus;
  type: TripType;

  trip_histories: TripHistory[];


  itinerary?: Itinerary;
}

export default Trip;