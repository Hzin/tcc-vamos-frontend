import { schoolPeriods } from "./schoolPeriods";

export interface InterfaceItinerarySearchData {
  period: schoolPeriods;
  lat_origin: number,
  lng_origin: number,
  formatted_address_origin: string,
  lat_destination: number,
  lng_destination: number,
  formatted_address_destination: string,
}