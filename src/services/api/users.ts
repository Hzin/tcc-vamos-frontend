import instance from "./api";

import userRoutes from "../../constants/routes/usersRoutes";
import { setStore } from "../../store/RecordsStore";

export interface CadastroResponse {
  message?: string;

  token?: {
    token: string;
  };

  error?: string;
}

export interface CadastroRequest {
  name: string;
  lastname: string;
  email: string;
  birth_date: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  bio?: string;
  document_type?: string;
  document?: string;
  phone_number?: string;
}

// export async function get(cpf) {

//   const response = await instance.get(userRoutes.get.url + `/${cpf}`, { headers: header });
//   return response.data;
// }

export async function create(CadastroRequest: any) {

  const response = await instance.post(userRoutes.create.url, CadastroRequest);
  return response.data;
}

export async function getById(userId: string) {

  const response = await instance.get(userRoutes.get.url + `/${userId}`);
  return response.data;
}

export async function update(userData: UpdateUserRequest) {

  const response = await instance.patch(userRoutes.update.url, userData);
  return response.data;
}

export async function checkIfUserIsDriver(id_user: string) {

  const response = await instance.get(
    userRoutes.checkIfUserIsDriver.url + `/${id_user}`
  );
  return response.data;
}

// TODO, continuar
export async function getSocialInfo(userId: string) {

  const response = await instance.get(
    userRoutes.getSocialInfo.url + `/${userId}`
  );
  return response.data;
}

export async function getUsersSearching(currentPoint: any) {
  //	Replace lat/long with values from get current location.
  //	Allow choosing of radius?
  //	Offset could = amount loaded in an infinite scroll?
  // var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 3000, offset = 0;
  // const response = await fetch(`http://localhost:4000/get-records?latitude=${ latitude }&longitude=${ longitude }&radius=${ radius }&offset=${ offset }`);
  const response = await instance.post(
    `${userRoutes.getUsersSearching.url}`,
    currentPoint
  );
  // const data = await response.json();
  console.log(response.data);
  setStore(response.data);
}

export async function createUserSearch(
  latitude_from: any,
  longitude_from: any,
  addres_to: any
) {
  const response = await instance.post(`${userRoutes.createUserSearch.url}`, {
    latitude_from,
    longitude_from,
    addres_to,
  });

  console.log(response);
  setStore(response);
}
