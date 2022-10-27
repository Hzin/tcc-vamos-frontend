import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import { documentOutline } from "ionicons/icons";

import { Vehicle } from "../models/vehicle.model";
import { VehicleDocument } from "../models/vehicleDocument.model";

interface ComponentProps {
  vehicle: Vehicle;
  document: VehicleDocument;
}

export const VehicleDocumentCard = (props: ComponentProps) => {
  const handleLoadDocument = () => {};

  return (
    <IonCard
      button={true}
      slot={"content"}
      onClick={() => {
        handleLoadDocument();
      }}
    >
      <IonCardHeader>
        <IonCardTitle>
          {props.vehicle.brand} - {props.vehicle.model} ({props.vehicle.plate})
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonIcon icon={documentOutline} className="mr-1" />
        {props.document.document_type}
      </IonCardContent>
    </IonCard>
  );
};
