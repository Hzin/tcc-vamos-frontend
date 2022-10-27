import { Itinerary } from "./itinerary.model";
import { User } from "./user.model";
import { VehicleDocument } from "./vehicleDocument.model";

export interface Vehicle {
  plate: string;
  brand: string;
  model: string;
  seats_number: string;
  locator_name: string;
  locator_address: string;
  locator_complement: string;
  locator_city: string;
  locator_state: string;
  picture: string;
  user: User;
  itineraries?: Itinerary[];
  documents?: VehicleDocument[];
  created_at: Date;
  updated_at: Date;
};
