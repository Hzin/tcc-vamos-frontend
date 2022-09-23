import instance from './api';
import sessionRoutes from '../../constants/routes/sessionRoutes';
import LocalStorage from '../../LocalStorage';

let token: string | null;

interface createData {
  login: string,
  password: string,
}

export async function create(data: createData) {
  const response = await instance.post(sessionRoutes.create.url, data);
  return response.data;
}

export async function refresh() {
  token = LocalStorage.getToken();
  
  let response = await instance.post(sessionRoutes.refresh.url, { token });
  return response.data;
}