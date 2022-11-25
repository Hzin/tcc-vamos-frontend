import * as passengersRoutes from "../api/passengers";

import { Passenger } from "../../models/passenger.model";

export async function getByItineraryId(id_itinerary: string): Promise<Passenger[]> {
  let res: any;

  try {
    res = await passengersRoutes.getByItineraryId(id_itinerary);
  } catch (error) {
    // TODO
  }

  return res.data;
}