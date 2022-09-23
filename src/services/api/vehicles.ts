import instance from "./api";

import vehiclesRoutes from "../../constants/routes/vehiclesRoutes";

export async function getByPlate(vehicleId: string) {

  const response = await instance.get(vehiclesRoutes.getByPlate.url + `/${vehicleId}`);

  return response.data;
}

export async function getByUserId(userId: string) {

  const response = await instance.get(vehiclesRoutes.getByUserId.url + `/${userId}`);

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

  const response = await instance.post(vehiclesRoutes.create.url, CreateVehicleBody);
  return response.data;
}

interface UpdateVehicleBody {
  brand?: string;
  model?: string;
  seats_number?: string;
}

export async function update(vehicleData: UpdateVehicleBody) {

  const response = await instance.patch(vehiclesRoutes.update.url, vehicleData);

  return response.data;
}
