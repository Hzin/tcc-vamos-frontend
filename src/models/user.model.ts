import { Passenger } from "./passenger.model";
import { PassengerRequest } from "./passengerRequest.model";
import { Vehicle } from "./vehicle.model";

export interface User {
  id_user: string;
  name: string;
  lastname: string;
  email: string;
  phone_number: string;
  birth_date: string;
  password: string;
  avatar_image: string;
  bio: string;
  star_rating: number;
  document_type: string;
  document: string;

  vehicles: Vehicle[];
  // usersSearching: UserSearching[];
  passengerRequest: PassengerRequest[];
  passengers: Passenger[];
}