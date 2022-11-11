import { PassengerRequestStatusTypes } from "../constants/enumPassengerRequestStatusTypes";
import { schoolPeriods } from "../constants/schoolPeriods";
import { Itinerary } from "./itinerary.model";
import { User } from "./user.model";

export interface Passenger {
  id_passenger: number;
  itinerary_id: string;
  user_id: string;
  status: PassengerRequestStatusTypes;
  period: schoolPeriods,
  lat_origin: number;
  lng_origin: number;
  formatted_address_origin: string;
  lat_destination: number;
  lng_destination: number;
  formatted_address_destination: string;
  payment_status: boolean;
  start_date: Date;
  end_date: Date;

  itinerary: Itinerary,
  user: User
}