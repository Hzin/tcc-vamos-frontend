import * as searchesRoutes from "../api/searches";

import { setStore } from "../../store/RecordsStore";

export async function list(): Promise<any[]> {
  let res: any;

  try {
    res = await searchesRoutes.list();
  } catch (error) {
    // TODO
  }

  return res.data;
}

export interface CreateBody {
  latitude_from: number;
  longitude_from: number;
  address_to: string;
}

export async function create(body: CreateBody): Promise<any> {
  let res: any;

  try {
    res = await searchesRoutes.create(body);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export interface SearchInRadiusBody {
  latitude: number;
  longitude: number;
}

export async function searchInRadius(body: SearchInRadiusBody): Promise<any> {
  let res: any;

  try {
    res = await searchesRoutes.searchInRadius(body);
  } catch (error) {
    // TODO
  }

  return res.data;
}

// TODO, estava em ./api/users.ts
// export async function getUsersSearching(currentPoint: any) {
//   //	Replace lat/long with values from get current location.
//   //	Allow choosing of radius?
//   //	Offset could = amount loaded in an infinite scroll?
//   // var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 3000, offset = 0;
//   // const response = await fetch(`http://localhost:4000/get-records?latitude=${ latitude }&longitude=${ longitude }&radius=${ radius }&offset=${ offset }`);
//   const response = await instance.post(
//     `${userRoutes.getUsersSearching.url}`,
//     currentPoint
//   );
//   // const data = await response.json();
//   console.log(response.data);
//   setStore(response.data);
// }

// // TODO, melhorar?
// export async function createUserSearch(
//   lat_origin: number,
//   lng_origin: number,
//   formatted_address_origin: string,
//   lat_destination: number,
//   lng_destination: number,
//   formatted_address_destination: string,
// ) {
//   const response = await instance.post(`${userRoutes.createUserSearch.url}`, {
//     latitude_from,
//     longitude_from,
//     addres_to,
//   });

//   console.log(response);
//   setStore(response);
// }