import { Itinerary } from "./itinerary.model";

export interface Destination {
    id_destination: number;
    itinerary: Itinerary;
    formatted_address: string;
    lat: number;
    lng: number;
    is_final: boolean;
}