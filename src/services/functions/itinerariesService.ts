import { PassengerRequestStatusTypes } from "../../constants/enumPassengerRequestStatusTypes";
import { itineraryContractTypes } from "../../constants/itineraryContractTypes";
import { Itinerary } from "../../models/itinerary.model";
import PassengerRequest from "../../models/passengerRequest.model";
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

export async function getAllItineraries(): Promise<Itinerary[]> {
  let res: any;

  try {
    res = await itinerariesRoutes.getAllItineraries();
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function searchItineraries(body: SearchItinerariesRequest): Promise<Itinerary[]> {
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

export async function getById(id: string): Promise<Itinerary> {
  let res: any;

  res = await itinerariesRoutes.getById(id);

  return res.data;
}

export async function getByDriverUserId(id_driver: string): Promise<Itinerary[]> {
  let res: any;

  res = await itinerariesRoutes.getByDriverUserId(id_driver);

  return res.data;
}

export async function getByPassengerUserId(id_passenger: string): Promise<Itinerary[]> {
  let res: any;

  res = await itinerariesRoutes.getByPassengerUserId(id_passenger);

  return res.data;
}

export interface CreateContractRequestRequest {
  id_itinerary: number;

  body: {
    contract_type: itineraryContractTypes;
    lat_origin: number;
    lng_origin: number;
    formatted_address_origin: string;
    lat_destination: number;
    lng_destination: number;
    formatted_address_destination: string;
  }
}

export async function createContractRequest({ id_itinerary, body }: CreateContractRequestRequest): Promise<any> {
  let res: any;

  res = await itinerariesRoutes.createContractRequest({ id_itinerary, body });

  return res;
}

export interface UpdateContractStatusRequest {
  id_itinerary: string;
  id_user: string;
  status: PassengerRequestStatusTypes
}

export async function updateContractStatus({ id_itinerary, id_user, status }: UpdateContractStatusRequest): Promise<any> {
  let res: any;

  res = await itinerariesRoutes.updateContractStatus({ id_itinerary, id_user, status });

  return res.data;
}

export async function getPassengers(id_itinerary: string): Promise<any> {
  let res: any;

  res = await itinerariesRoutes.getPassengers(id_itinerary);

  return res.data;
}

export async function getPendingContractRequests(id_itinerary: string): Promise<PassengerRequest[]> {
  let res: any;

  res = await itinerariesRoutes.getPendingContractRequests(id_itinerary);

  return res.data;
}