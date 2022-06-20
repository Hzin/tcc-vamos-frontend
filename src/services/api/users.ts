import instance from './api';
// import LocalStorage from '../LocalStorage';

import userRoutes from '../../constants/routes/usersRoutes';
import { AxiosRequestHeaders } from 'axios';
import LocalStorage from '../../LocalStorage';

let token: string;
let header: AxiosRequestHeaders;

function updateHeader() {
  token = LocalStorage.getToken();

  header = {
    "Accept": 'application/json',
    "Content-Type": 'application/json',
    "Authorization": 'Bearer ' + token
  }
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
  lastname: string;
  email: string;
  birth_date: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  bio?: string;
  cpf?: string;
  cnpj?: string;
}

// export async function get(cpf) {
//   updateHeader();

//   const response = await instance.get(userRoutes.get.url + `/${cpf}`, { headers: header });
//   return response.data;
// }

export async function create(CadastroRequest: any) {
  updateHeader();

  const response = await instance.post(userRoutes.create.url, CadastroRequest);
  return response.data;
}

export async function getById(userId: string) {
  updateHeader();

  const response = await instance.get(userRoutes.get.url + `/${userId}`, { headers: header });
  return response.data;
}

export async function update(userData: UpdateUserRequest) {
  updateHeader();

  const response = await instance.patch(userRoutes.update.url, userData, { headers: header });
  return response.data;
}

// TODO, continuar
export async function getSocialInfo(userId: string) {
  updateHeader();

  const response = await instance.get(userRoutes.getSocialInfo.url + `/${userId}`, { headers: header });
  return response.data;
}