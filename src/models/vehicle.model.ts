import { Itinerary } from "./itinerary.model";
import { User } from "./user.model";

export interface Vehicle {
  plate: string;
  brand: string;
  model: string;
  seats_number: string;
  document_status: boolean
  locator_name: string;
  locator_address: string;
  locator_complement: string;
  locator_city: string;
  locator_state: string;
  user: User;
  itineraries?: Itinerary[];
  // created_at: Date;
  // updated_at: Date;
};
