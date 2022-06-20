import instance from "./api";

import vansRoutes from "../../constants/routes/vansRoutes";
import { AxiosRequestHeaders } from "axios";
import LocalStorage from "../../LocalStorage";

let token: string;
let header: AxiosRequestHeaders;

function updateHeader() {
  token = LocalStorage.getToken();

  header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export async function getByPlate(vanId: string) {
  updateHeader();

  const response = await instance.get(vansRoutes.getByPlate.url + `/${vanId}`, {
    headers: header,
  });

  return response.data;
}

export async function getByUserId(userId: string) {
  updateHeader();

  const response = await instance.get(vansRoutes.getByUserId.url + `/${userId}`, {
    headers: header,
  });

  return response.data;
}

interface CreateVanBody {
  plate: string;
  brand: string;
  model: string;
  seats_number: string;
  locator_name: string;
  locator_address: string;
  locator_complement: string;
  locator_city: string;
  locator_state: string;
}

export async function create(CreateVanBody: CreateVanBody) {
  updateHeader();

  const response = await instance.post(vansRoutes.create.url, CreateVanBody, { headers: header });
  return response.data;
}

interface UpdateVanBody {
  brand?: string;
  model?: string;
  seats_number?: string;
}

export async function update(vanData: UpdateVanBody) {
  updateHeader();

  const response = await instance.patch(vansRoutes.update.url, vanData, {
    headers: header,
  });

  return response.data;
}
