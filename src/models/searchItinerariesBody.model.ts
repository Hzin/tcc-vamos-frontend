import { Coordinates } from "./coordinates.model";

export interface searchItinerariesBody {
    coordinatesFrom: Coordinates,
    coordinatesTo: Coordinates,

    orderBy?: string,
    orderOption?: string,
    preference_AvulseSeat?: boolean;
    preference_A_C?: boolean;
    preference_PrioritySeat?: boolean;
}