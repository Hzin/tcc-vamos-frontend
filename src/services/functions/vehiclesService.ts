import { vehicleDocumentStatus } from "../../constants/vehicleDocumentStatus";
import { Vehicle } from "../../models/vehicle.model";
import * as vehiclesRoutes from "../api/vehicles";

export interface VehicleInfo {
  picture: string;
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

export async function deleteVehicle(plate: string): Promise<any> {
  let res: any;

  try {
    res = await vehiclesRoutes.deleteVehicle(plate);
  } catch (error) {
    // TODO
  }

  return res.message;
}

export async function getByUserId(user_id: string): Promise<any[]> {
  let res: VehicleInfo[] = [];

  try {
    res = await vehiclesRoutes.getByUserId(user_id);
  } catch (error) {
    // TODO
  }

  return res;
}

export async function getByPlate(vehicle_plate: string): Promise<VehicleInfo> {
  let res: any;

  try {
    res = await vehiclesRoutes.getByPlate(vehicle_plate);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function searchDocumentFile(vehicle_plate: string, document_type: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.searchDocumentFile({ vehicle_plate, document_type });
  } catch (error) {
    // TODO
  }

  return res;
}

interface UploadFileResponse {
  message?: string
}

export async function uploadDocumentFile(file: File, vehicle_plate: string, document_type: string): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('vehicle_plate', vehicle_plate)
  formData.append('document_type', document_type)

  let res: any;

  try {
    res = await vehiclesRoutes.uploadDocumentFile(formData);
  } catch (error) {
    // TODO
  }

  return res;
}

export async function uploadPictureFile(file: File, vehicle_plate: string): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('vehicle_plate', vehicle_plate)

  let res: any;

  try {
    res = await vehiclesRoutes.uploadPictureFile(formData);
  } catch (error) {
    // TODO
  }

  return res;
}

export async function deleteDocumentFile(vehicle_plate: string, document_type: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.deleteDocumentFile({ vehicle_plate, document_type });
  } catch (error) {
    // TODO
  }

  return res;
}

export interface CanCreateItinerariesResponse {
  message: string,
  data: boolean
}

export async function canCreateItineraries(plate: string): Promise<CanCreateItinerariesResponse> {
  let res: any;

  try {
    res = await vehiclesRoutes.canCreateItineraries(plate);
  } catch (error) {
    // TODO
  }

  return res;
}

export async function deletePictureFile(vehicle_plate: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.deletePictureFile({ vehicle_plate });
  } catch (error) {
    // TODO
  }

  return res;
}

export async function updateDocumentStatus(vehicle_plate: string, document_type: string, status: vehicleDocumentStatus): Promise<string> {
  let res: any;

  try {
    res = await vehiclesRoutes.updateDocumentStatus({ vehicle_plate, document_type, status });
  } catch (error) {
    // TODO
  }

  return res.message;
}

// obs.: igual a Vehicle
export interface GetPendingDocumentsResponse {
  document_status: string;
  document_type: string;
  document_url: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_plate: string;
  vehicle_picture: string;
};

export async function getPendingDocuments(): Promise<GetPendingDocumentsResponse[]> {
  let res: any;

  try {
    res = await vehiclesRoutes.getPendingDocuments();
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function countVehiclesPendingDocuments(): Promise<number> {
  let res: any;

  try {
    res = await vehiclesRoutes.countVehiclesPendingDocuments();
  } catch (error) {
    // TODO
  }

  return res.data;
}