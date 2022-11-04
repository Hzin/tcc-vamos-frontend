import { PassengerRequestStatusTypes } from "../constants/enumPassengerRequestStatusTypes";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";
import { schoolPeriods } from "../constants/schoolPeriods";
import { Itinerary } from "./itinerary.model";
import { User } from "./user.model";

export interface PassengerRequest {
  id_passenger_request: number;
  itinerary_id: string;
  user_id: string;
  contract_type: itineraryContractTypes;
  status: PassengerRequestStatusTypes;
  period: schoolPeriods,
  created_at: Date;
  lat_origin: number;
  lng_origin: number;
  formatted_address_origin: string;
  lat_destination: number;
  lng_destination: number;
  formatted_address_destination: string;

  itinerary: Itinerary;
  user: User;
}