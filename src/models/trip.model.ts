import { tripStatus } from "../constants/tripStatus";
import { Itinerary } from "./itinerary.model";
import { TripHistory } from "./tripHistory.model";

export interface Trip {
    id_trip: number;
    itinerary_id: number;
    nickname: string;
    date: string;
    status: tripStatus;
    trip_histories: TripHistory[];
    
    
    itinerary?: Itinerary;
}