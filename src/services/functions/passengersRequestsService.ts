import * as passengersRequestsRoutes from "../api/passengersRequests";

import { PassengerRequest } from "../../models/passengerRequest.model";
import { Itinerary } from "../../models/itinerary.model";
import { User } from "../../models/user.model";

import { SearchData, ContractData } from "../../constants/InterfaceContractInfo";

export async function getById(id_passenger_request: string): Promise<PassengerRequest> {
  let res: any;

  try {
    res = await passengersRequestsRoutes.getById(id_passenger_request);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export interface GetPassengerRequestInfoForContractSummaryReturn {
  searchData: SearchData
  contractData: ContractData
  passenger: User,
  itinerary: Itinerary
}

export const getPassengerRequestInfoForContractSummary = async (id_passenger_request: number): Promise<GetPassengerRequestInfoForContractSummaryReturn> => {
  // pega o tipo do contrato pelo id_passenger_request
  const contract = await getById("" + id_passenger_request)

  return {
    searchData: {
      period: contract.period,
      lat_origin: contract.lat_origin,
      lng_origin: contract.lng_origin,
      formatted_address_origin: contract.formatted_address_origin,
      lat_destination: contract.lat_destination,
      lng_destination: contract.lng_destination,
      formatted_address_destination: contract.formatted_address_destination,
    },
    contractData: {
      type: contract.contract_type,
    },
    passenger: contract.user,
    itinerary: contract.itinerary
  }
}

export const searchByIdUserAndIdItinerary = async (id_user: string, id_itinerary: string): Promise<PassengerRequest> => {
  let res: any;

  try {
    res = await passengersRequestsRoutes.searchByIdUserAndIdItinerary(id_user, id_itinerary);
  } catch (error) {
    // TODO
  }

  return res.data;
}