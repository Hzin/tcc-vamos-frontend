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

export async function deletePictureFile(vehicle_plate: string): Promise<Vehicle> {
  let res: any;

  try {
    res = await vehiclesRoutes.deletePictureFile({ vehicle_plate });
  } catch (error) {
    // TODO
  }

  return res;
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