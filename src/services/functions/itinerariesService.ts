import * as itinerariesRoutes from "../api/itineraries";

export interface SearchItinerariesRequest {
  coordinatesFrom: {
    lat: number;
    lng: number;
  };
  coordinatesTo: {
    lat: number;
    lng: number;
  };
  period: string;
  orderBy?: string
  orderOption?: string
  preference_AvulseSeat?: boolean
  preference_A_C?: boolean
  preference_PrioritySeat?: boolean
}

export async function getAllItineraries(): Promise<any> {
  let res: any;

  try {
    res = await itinerariesRoutes.getItineraries();
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function searchItineraries(body: SearchItinerariesRequest): Promise<any> {
  let res: any;
  try {
    res = await itinerariesRoutes.search(body);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function createItinerary(
  itinerary: itinerariesRoutes.CreateItineraryRequest
): Promise<any> {
  let res: any;

  res = await itinerariesRoutes.create(itinerary);

  return res;
}
