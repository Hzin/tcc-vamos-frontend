import { PassengerRequestStatusTypes } from "../constants/enumPassengerRequestStatusTypes";
import { itineraryContractTypes } from "../constants/itineraryContractTypes";

export interface PassengerRequest {
  id_passenger_request: number;
  itinerary_id: string;
  user_id: string;
  contract_type: itineraryContractTypes;
  status: PassengerRequestStatusTypes;
  created_at: Date;
  lat_origin: number;
  lng_origin: number;
  formatted_address_origin: string;
  lat_destination: number;
  lng_destination: number;
  formatted_address_destination: string;
}

export default PassengerRequest;
