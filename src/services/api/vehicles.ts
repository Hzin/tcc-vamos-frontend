import instance from "./api";

import vehiclesRoutes from "../../constants/routes/vehiclesRoutes";
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

export async function getByPlate(vehicleId: string) {
  updateHeader();

  const response = await instance.get(vehiclesRoutes.getByPlate.url + `/${vehicleId}`, {
    headers: header,
  });

  return response.data;
}

export async function getByUserId(userId: string) {
  updateHeader();

  const response = await instance.get(vehiclesRoutes.getByUserId.url + `/${userId}`, {
    headers: header,
  });

  return response.data;
}

interface CreateVehicleBody {
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

export async function create(CreateVehicleBody: CreateVehicleBody) {
  updateHeader();

  const response = await instance.post(vehiclesRoutes.create.url, CreateVehicleBody, { headers: header });
  return response.data;
}

interface UpdateVehicleBody {
  brand?: string;
  model?: string;
  seats_number?: string;
}

export async function update(vehicleData: UpdateVehicleBody) {
  updateHeader();

  const response = await instance.patch(vehiclesRoutes.update.url, vehicleData, {
    headers: header,
  });

  return response.data;
}
