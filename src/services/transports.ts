import instance from "../services/api/api";
import transportRoutes from '../constants/routes/transportRoutes';

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
  coordinatesFrom: {
    lat: number,
    lng: number
  },
  coordinatesTo: {
    lat: number,
    lng: number
  }
}

export async function getTransportes(request: CoordinatesRequest) {
  updateHeader();

  const response = await instance.post(`${transportRoutes.getTransportes.url}`, request);
  return response.data as [];
}