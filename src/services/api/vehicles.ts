import instance from "./api";

import vehiclesRoutes from "../../constants/routes/vehiclesRoutes";
import { vehicleDocumentStatus } from "../../constants/vehicleDocumentStatus";
import { VehicleInfo } from "../functions/vehiclesService";

export async function getByPlate(vehicleId: string): Promise<VehicleInfo> {
  let response = await instance.get(vehiclesRoutes.getByPlate.url + `/${vehicleId}`);

  return response.data;
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

export async function create(createVehicleBody: CreateVehicleBody): Promise<any> {
  const response = await instance.post(vehiclesRoutes.create.url, createVehicleBody);
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

export async function deleteVehicle(plate: string): Promise<any> {
  const response = await instance.delete(`${vehiclesRoutes.delete.url}/${plate}`);
  return response.data;
}

// interface
interface SearchFileBody {
  vehicle_plate: string,
  document_type: string
}

// rotas de document

export async function searchDocumentFile(SearchFileBody: SearchFileBody): Promise<any> {
  const response = await instance.post(vehiclesRoutes.searchDocumentFile.url, SearchFileBody);
  return response.data;
}

export async function uploadDocumentFile(uploadData: FormData): Promise<any> {
  const response = await instance.post(vehiclesRoutes.uploadDocumentFile.url, uploadData);
  return response.data;
}

interface DeleteVehicleDocumentFileBody {
  vehicle_plate: string,
  document_type: string,
}

export async function deleteDocumentFile(deleteData: DeleteVehicleDocumentFileBody): Promise<any> {
  const response = await instance.patch(vehiclesRoutes.deleteDocumentFile.url, deleteData);
  return response.data;
}

interface UpdateDocumentStatusBody {
  vehicle_plate: string,
  document_type: string,
  status: vehicleDocumentStatus
}

export async function updateDocumentStatus(body: UpdateDocumentStatusBody): Promise<any> {
  const response = await instance.patch(vehiclesRoutes.updateDocumentStatus.url, body);
  return response.data;
}

// rotas de picture

export async function searchPictureFile(SearchFileBody: SearchFileBody): Promise<any> {
  const response = await instance.post(vehiclesRoutes.searchPictureFile.url, SearchFileBody);
  return response.data;
}

export async function uploadPictureFile(uploadData: FormData): Promise<any> {
  const response = await instance.patch(vehiclesRoutes.uploadPictureFile.url, uploadData);
  return response.data;
}

interface DeleteVehiclePictureFileBody {
  vehicle_plate: string
}

export async function deletePictureFile(deleteData: DeleteVehiclePictureFileBody): Promise<any> {
  const response = await instance.patch(vehiclesRoutes.deletePictureFile.url, deleteData);
  return response.data;
}

export async function getPendingDocuments(): Promise<any> {
  const response = await instance.get(vehiclesRoutes.getPendingDocuments.url);
  return response.data;
}

export async function countVehiclesPendingDocuments(): Promise<any> {
  const response = await instance.get(vehiclesRoutes.countVehiclesPendingDocuments.url);
  return response.data;
}

// TODO, fazer
export async function canCreateItineraries(plate: string): Promise<any> {
  const response = await instance.get(`${vehiclesRoutes.canCreateItineraries.url}/${plate}`);
  return response.data;
}