import * as itinerariesRoutes from "../api/itineraries";

interface CoordinatesRequest {
  coordinatesFrom: {
    formatted_address: string;
    lat: number;
    lng: number;
  };
  coordinatesTo: {
    formatted_address: string;
    lat: number;
    lng: number;
  };
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

export async function searchItineraries({
  coordinatesFrom,
  coordinatesTo,
}: CoordinatesRequest): Promise<any> {
  let res: any;
  try {
    res = await itinerariesRoutes.search(coordinatesFrom, coordinatesTo);
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
