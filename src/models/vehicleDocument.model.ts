import { Vehicle } from "./vehicle.model";
import { vehicleDocumentStatus } from "../constants/vehicleDocumentStatus";


export interface VehicleDocument {
  id_vehicles_documents: number;
  vehicle: Vehicle;
  document_type: string;
  path: string;
  status: vehicleDocumentStatus;
  // created_at: Date;
  // updated_at: Date;
};