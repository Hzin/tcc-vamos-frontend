import instance from "./api";

import passengersRequestsRoutes from "../../constants/routes/passengersRequestsRoutes";

export async function getById(id_passenger_request: string) {
  const finalUrl = passengersRequestsRoutes.getById.url.replace(':id', id_passenger_request)
  const response = await instance.get(finalUrl);
  return response.data;
}

export async function searchByIdUserAndIdItinerary(id_user: string, id_itinerary: string) {
  const response = await instance.post(passengersRequestsRoutes.searchByIdUserAndIdItinerary.url, { id_user, id_itinerary });
  return response.data;
}