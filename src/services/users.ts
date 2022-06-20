import instance from '../services/api/api';
import { setStore } from "../store/RecordsStore";
// import LocalStorage from '../LocalStorage';

import userRoutes from '../constants/routes/usersRoutes';

// let token:string;
let header:string;

function updateHeader() {
//   token = LocalStorage.getToken();
  header = `{
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token
  }`
}

export interface CadastroResponse {
    message?: string;
  
    token?: {
      token: string;
    };
  
    error?: string;
}

export interface CadastroRequest {
    name: string;
    email: string;
    birth_date: string;
    password: string;
}

// export async function get(cpf) {
//   updateHeader();

//   const response = await instance.get(userRoutes.get.url + `/${cpf}`, { headers: header });
//   return response.data;
// }

export async function create(CadastroRequest: any) {
  updateHeader();

  const response = await instance.post("http://localhost:3333/users/", CadastroRequest);
  return response.data;
}

export async function getUsersSearching(currentPoint: any) {
  //	Replace lat/long with values from get current location.
	//	Allow choosing of radius?
	//	Offset could = amount loaded in an infinite scroll?
	var latitude = currentPoint.latitude, longitude = currentPoint.longitude, radius = 3000, offset = 0;
	// const response = await fetch(`http://localhost:4000/get-records?latitude=${ latitude }&longitude=${ longitude }&radius=${ radius }&offset=${ offset }`);
  const response = await instance.post(`${userRoutes.getUsersSearching.url}`, currentPoint)
	// const data = await response.json();
  console.log(response.data)
	setStore(response.data);
}