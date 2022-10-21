import { vehicleDocumentStatus } from "../../constants/vehicleDocumentStatus";
import { Vehicle } from "../../models/vehicle.model";
import * as vehiclesRoutes from "../api/vehicles";

export async function getByPlate(vehicle_plate: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.getByPlate(vehicle_plate);
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function searchFile(vehicle_plate: string, document_type: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.searchFile({ vehicle_plate, document_type });
  } catch (error) {
    // TODO
  }

  return res;
}

interface UploadFileResponse {
  message?: string
}

export async function uploadFile(file: File, vehicle_plate: string, document_type: string): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('vehicle_plate', vehicle_plate)
  formData.append('document_type', document_type)

  let res: any;

  try {
    res = await vehiclesRoutes.uploadFile(formData);
  } catch (error) {
    // TODO
  }

  return res;
}

export async function deleteFile(vehicle_plate: string, document_type: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.deleteFile({ vehicle_plate, document_type });
  } catch (error) {
    // TODO
  }

  return res.data;
}

export async function updateDocumentStatus(vehicle_plate: string, document_type: string, status: vehicleDocumentStatus): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.updateDocumentStatus({ vehicle_plate, document_type, status });
  } catch (error) {
    // TODO
  }

  return res.data;
}