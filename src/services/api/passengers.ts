import instance from "./api";

import passengersRoutes from "../../constants/routes/passengersRoutes";

export async function getByItineraryId(id_itinerary: string) {
  const finalUrl = passengersRoutes.getByItineraryId.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl);
  return response.data;
}
