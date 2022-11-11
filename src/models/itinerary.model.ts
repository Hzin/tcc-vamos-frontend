import { Destination } from "./destination.model";
import { NeighborhoodServed } from "./NeighborhoodServed.model";
import { Trip } from "./trip.model";
import { Passenger } from "./passenger.model";
import { PassengerRequest } from "./passengerRequest.model";

import { User } from "./user.model";
import { Vehicle } from "./vehicle.model";

export interface Itinerary {
  id_itinerary: number;
  vehicle_plate: string;
  days_of_week: string;
  specific_day?: Date;
  estimated_departure_time: string;
  is_active: boolean;
  estimated_arrival_time: string;
  available_seats: number;
  monthly_price: number;
  daily_price: number;
  accept_daily: boolean;
  itinerary_nickname: string;
  estimated_departure_address: string;
  departure_latitude: number;
  departure_longitude: number;
  neighborhoods_served: NeighborhoodServed[];
  destinations: Destination[];
  trips?: Trip[];
  passengers?: Passenger[];
  passengerRequests?: PassengerRequest[];
  // created_at: Date;
  // updated_at: Date;

  user: User
  vehicle: Vehicle;
}