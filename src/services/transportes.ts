import instance from "../services/api/api";
import { setStore } from "../store/RecordsStore";
// import LocalStorage from '../LocalStorage';

// let token:string;
let header: string;

function updateHeader() {
  //   token = LocalStorage.getToken();
  header = `{
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token
  }`;
}

interface CoordinatesRequest {
  coordinatesFrom:{
    lat: number,
    lng: number
  },
  coordinatesTo:{
    lat: number,
    lng: number
  }
}

export async function getTransportes(request: CoordinatesRequest) {
  updateHeader();

  console.log(request)
  const response = await instance.post("http://localhost:3333/transportes/", request);
  return response.data as [];
}
