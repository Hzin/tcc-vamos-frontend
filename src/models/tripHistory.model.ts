import { tripStatus } from "../constants/tripStatus";
import { Trip } from "./trip.model";

export interface TripHistory {
    id_trips_history: number;
    trip: Trip;
    old_status: tripStatus;
    new_status: tripStatus;
    description: string;
    // created_at: Date;
    // updated_at: Date;
}