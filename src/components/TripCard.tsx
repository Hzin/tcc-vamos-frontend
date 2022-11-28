import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonChip,
  IonCardSubtitle,
  useIonAlert,
} from "@ionic/react";
import { locateOutline, locationOutline } from "ionicons/icons";
import { Color } from "@ionic/core";

import { tripStatus } from "../constants/tripStatus";
import { Itinerary } from "../models/itinerary.model";

import * as tripsService from "../services/functions/tripsService";

import { reloadPage } from "../services/utils";

import { useHistory } from "react-router";

interface ComponentProps {
  itinerary: Itinerary;
  tripStatus?: string;
  slot?: string;
  clickable: boolean;
  tripId?: string;
  // isPassenger: boolean;
}

interface IonChipTripStatusProps {
  status: string;
}

export const IonChipTripStatus = (props: IonChipTripStatusProps) => {
  let ionChipColor = "",
    ionChipLabel = "";

  switch (props.status) {
    case tripStatus.pending:
      ionChipColor = "warning";
      ionChipLabel = "Pendente confirmação";
      break;
    case tripStatus.confirmed:
      ionChipColor = "success";
      ionChipLabel = "Confirmada";
      break;
    case tripStatus.canceled:
      ionChipColor = "medium";
      ionChipLabel = "Cancelada";
      break;
    case tripStatus.inProgress:
      ionChipColor = "secondary";
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

export const TripCard = (props: ComponentProps) => {
  const history = useHistory();

  const [presentAlert] = useIonAlert();
  const [presentAlertConfirmation] = useIonAlert();

  const refreshPage = (message: string, toastColor: Color) => {
    history.push({
      pathname: "/home",
      state: {
        redirectData: {
          showToastMessage: true,
          toastColor: toastColor,
          toastMessage: message,
        },
      },
    });
    reloadPage();
  };

  const handleCancelTrip = async (itineraryId: string) => {
    await tripsService.cancelTrip(itineraryId).then((response) => {
      if (!response.data) {
        refreshPage("Houve um erro ao cancelar a viagem!", "warning");
        return;
      }

      refreshPage("Viagem cancelada com sucesso!", "success");
    });
  };

  const handleConfirmTrip = async (itineraryId: string) => {
    await tripsService.confirmTrip(itineraryId).then((response) => {
      if (!response.data) {
        refreshPage("Houve um erro ao confirmar a viagem!", "warning");
        return;
      }

      refreshPage("Viagem confirmada com sucesso.", "success");
    });
  };

  const handleConfirmActionTripAlert = async (
    itineraryId: string,
    action: string
  ) => {
    presentAlertConfirmation({
      header: "Tem certeza?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          role: "confirmAction",
        },
      ],

      onDidDismiss: (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;

        switch (action) {
          case "cancelTrip":
            handleCancelTrip(itineraryId);
            break;
          case "confirmTrip":
            handleConfirmTrip(itineraryId);
            break;
          default:
            break;
        }
      },
    });
  };

  const handleChooseActionTripAlert = (
    itineraryId: string,
    itineraryNickname: string
  ) => {
    presentAlert({
      header: `A viagem "${itineraryNickname}" está pendente`,
      message: "Deseja confirmar a viagem de hoje?",
      buttons: [
        {
          text: "Confirmar viagem",
          role: "confirmTrip",
          handler: () => {},
        },
        {
          text: "Cancelar viagem",
          role: "cancelTrip",
          handler: () => {},
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {},
        },
      ],
      onDidDismiss: (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;

        handleConfirmActionTripAlert(itineraryId, e.detail.role);
      },
    });
  };

  const redirectToTripPage = (itineraryId: string) => {
    history.push({
      pathname: `/viagem/${itineraryId}`,
    });
  };

  const handleLoadTrip = async (
    itineraryId: string,
    itineraryNickname: string
  ) => {
    await tripsService
      .getTodaysTripStatusByItineraryId(itineraryId)
      .then((response) => {
        switch (response) {
          case tripStatus.confirmed:
            if (props.tripId) redirectToTripPage(props.tripId);
            break;
          case tripStatus.pending:
            // if (!props.isPassenger) {
              handleChooseActionTripAlert(itineraryId, itineraryNickname);
            // }
            break;
          default:
            break;
        }
      });
  };

  return (
    <IonCard
      button={props.clickable}
      slot={props.slot}
      onClick={() => {
        if (!props.clickable) return;
        handleLoadTrip(
          "" + props.itinerary.id_itinerary,
          props.itinerary.itinerary_nickname
        );
      }}
    >
      <IonCardHeader>
        {props.tripStatus && (
          <IonCardSubtitle>
            Status:
            <IonChipTripStatus status={props.tripStatus} />
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
          {props.itinerary.destinations && props.itinerary.destinations.map((destination) => {
            if (destination.is_final) {
              return <>{destination.formatted_address}</>;
            }
            return undefined;
          })}
        </div>
      </IonCardContent>
    </IonCard>
  );
};
