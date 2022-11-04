import { tripStatus } from "../constants/tripStatus";
import { Itinerary } from "./itinerary.model";
import { TripHistory } from "./tripHistory.model";

export interface Trip {
    id_trip: number;
    itinerary: Itinerary;
    nickname: string;
    date: string;
    status: tripStatus;
    trip_histories: TripHistory[];
    // created_at: Date;
    // updated_at: Date;
}