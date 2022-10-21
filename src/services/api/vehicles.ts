import instance from "./api";

import vehiclesRoutes from "../../constants/routes/vehiclesRoutes";
import { Vehicle } from "../../models/van.model";
import { vehicleDocumentStatus } from "../../constants/vehicleDocumentStatus";

export async function getByPlate(vehicleId: string): Promise<VehicleInfo> {

  const response = await instance.get(vehiclesRoutes.getByPlate.url + `/${vehicleId}`);

  return response.data;
}

export interface VehicleInfo {
  plate: string;
  brand: string;
  model: string;
  seats_number: string;
  document_status: boolean;
  locator_name: string;
  locator_address: string;
  locator_complement: string;
  locator_city: string;
  locator_state: string;
}

export async function getByUserId(userId: string): Promise<VehicleInfo[]> {

  const response = await instance.get(vehiclesRoutes.getByUserId.url + `/${userId}`);

  return response.data.data;
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

export async function create(CreateVehicleBody: CreateVehicleBody): Promise<any> {

  const response = await instance.post(vehiclesRoutes.create.url, CreateVehicleBody);
  return response.data;
}

interface UpdateVehicleBody {
  brand?: string;
  model?: string;
  seats_number?: string;
}

export async function update(vehicleData: UpdateVehicleBody): Promise<any> {

  const response = await instance.patch(vehiclesRoutes.update.url, vehicleData);

  return response.data;
}

interface SearchFileBody {
  vehicle_plate: string,
  document_type: string
}

export async function searchFile(SearchFileBody: SearchFileBody): Promise<any> {
  const response = await instance.post(vehiclesRoutes.searchFile.url, SearchFileBody);

  return response.data;
}

export async function uploadFile(uploadData: FormData): Promise<any> {
  const response = await instance.post(vehiclesRoutes.uploadFile.url, uploadData);

  return response.data;
}

interface DeleteVehicleFileBody {
  vehicle_plate: string,
  document_type: string,
}

export async function deleteFile(deleteData: DeleteVehicleFileBody): Promise<any> {
  const response = await instance.post(vehiclesRoutes.deleteFile.url, deleteData);

  return response.data;
}

interface UpdateDocumentStatusBody {
  vehicle_plate: string,
  document_type: string,
  status: vehicleDocumentStatus
}

export async function updateDocumentStatus(body: UpdateDocumentStatusBody): Promise<any> {
  const response = await instance.patch(vehiclesRoutes.deleteFile.url, body);

  return response.data;
}