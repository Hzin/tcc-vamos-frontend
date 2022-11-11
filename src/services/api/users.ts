import instance from "./api";

import userRoutes from "../../constants/routes/usersRoutes";

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

export async function checkIfUserIsAdmin() {
  const response = await instance.get(`${userRoutes.checkIfUserIsAdmin.url}`);

  return response.data
}