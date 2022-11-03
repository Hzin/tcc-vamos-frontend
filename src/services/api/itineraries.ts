import instance from "./api";

import transportsRoutes from "../../constants/routes/itinerariesRoutes";
import { SearchItinerariesRequest, CreateContractRequestRequest, UpdateContractStatusRequest } from "../functions/itinerariesService";

export interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  formatted_address: string;
  lat: number;
  lng: number;
}

export interface CreateItineraryRequest {
  vehicle_plate: string;
  days_of_week?: string;
  specific_day?: string;
  estimated_departure_time: string;
  estimated_arrival_time: string;
  monthly_price: number;
  daily_price?: number;
  accept_daily: boolean;
  itinerary_nickname: string;
  estimated_departure_address: string;
  departure_latitude: number;
  departure_longitude: number;
  neighborhoods_served: Array<Address>;
  destinations: Array<Address>;
}

export interface CreateRequest {
  user_id: string;
  itinerary_id: number;
  address: string;
  latitude_address: number;
  longitude_address: number;
  is_single: boolean;
}

export async function getItineraries() {
  const response = await instance.get(transportsRoutes.get.url);
  return response.data;
}

export async function create(itinerary: CreateItineraryRequest) {
  const response = await instance.post(transportsRoutes.create.url, itinerary);
  return response.data;
}

export async function search(body: SearchItinerariesRequest
) {
  const response = await instance.post(
    transportsRoutes.search.url,
    body,
  );
  return response.data;
}

export async function getById(id: string) {
  const response = await instance.get(`${transportsRoutes.getById.url}/${id}`);
  return response.data;
}

export async function createContractRequest({ id_itinerary, body }: CreateContractRequestRequest) {
  const finalUrl = transportsRoutes.createContractRequest.url.replace(':id', "" + id_itinerary)
  const response = await instance.post(finalUrl, body);

  return response.data;
}

export async function updateContractStatus({ id_itinerary, id_user, status }: UpdateContractStatusRequest) {
  const response = await instance.patch(transportsRoutes.updateContractStatus.url, { id_itinerary, id_user, status });
  return response.data;
}

export async function getPassengers(id_itinerary: string) {
  const finalUrl = transportsRoutes.getPassengers.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl);
  return response.data;
}

export async function getPendingContractRequests(id_itinerary: string) {
  const finalUrl = transportsRoutes.getPendingContractRequests.url.replace(':id', id_itinerary)
  const response = await instance.get(finalUrl);
  return response.data;
}