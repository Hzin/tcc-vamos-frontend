import { Itinerary } from "./itinerary.model";

export interface NeighborhoodServed {
    id_neighborhood: number;
    itinerary: Itinerary;
    formatted_address: string;
    lat: number;
    lng: number;
}