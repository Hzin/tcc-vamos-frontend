import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonChip,
  IonCardSubtitle,
} from "@ionic/react";
import { locateOutline, locationOutline } from "ionicons/icons";
import { tripStatus } from "../constants/tripStatus";
import { Itinerary } from "../models/itinerary.model";

interface ComponentProps {
  itinerary: Itinerary;
  tripStatus?: string;
  slot?: string;
}

interface IonChipTripStatusProps {
  status: string;
}

const IonChipTripStatus = (props: IonChipTripStatusProps) => {
  let ionChipColor = "",
    ionChipLabel = "";

  switch (props.status) {
    case tripStatus.pending:
      ionChipColor = "warning";
      ionChipLabel = "Pendente";
      break;
    case tripStatus.confirmed:
      ionChipColor = "secondary";
      ionChipLabel = "Confirmada";
      break;
    case tripStatus.canceled:
      ionChipColor = "medium";
      ionChipLabel = "Cancelada";
      break;
    case tripStatus.inProgress:
      ionChipColor = "success";
      ionChipLabel = "Em progresso";
      break;
    case tripStatus.finished:
      ionChipColor = "primary";
      ionChipLabel = "Finalizada";
      break;
    default:
      break;
  }

  return (
    <>
      <IonChip color={ionChipColor}>{ionChipLabel}</IonChip>
    </>
  );
};

export const TripCard = (props: ComponentProps) => (
  <IonCard slot={props.slot}>
    <IonCardHeader>
      {props.tripStatus && (
        <IonCardSubtitle>
          Status:<IonChipTripStatus status={props.tripStatus} />
        </IonCardSubtitle>
      )}
      <IonCardTitle>{props.itinerary.itinerary_nickname}</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <div className="addresses-itinerary">
        <IonIcon icon={locateOutline} className="mr-1"></IonIcon>
        {props.itinerary.estimated_departure_address}
      </div>
      <div className="icons-location-divider">|</div>
      <div className="addresses-itinerary">
        <IonIcon icon={locationOutline} className="mr-1"></IonIcon>
        {props.itinerary.destinations.map((destination) => {
          if (destination.is_final) {
            return <>{destination.formatted_address}</>;
          }
        })}
      </div>
    </IonCardContent>
  </IonCard>
);
