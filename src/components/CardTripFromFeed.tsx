import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonChip,
  IonCardSubtitle,
  useIonAlert,
  IonItem,
  IonList,
  IonLabel,
} from "@ionic/react";
import { eyeOutline, locateOutline, locationOutline, returnDownForwardOutline, returnUpBackOutline } from "ionicons/icons";
import { Color } from "@ionic/core";

import { tripStatus } from "../constants/tripStatus";

import * as tripsService from "../services/api/trips";

import { reloadPage } from "../services/utils";

import { useHistory } from "react-router";
import { GetFeedPropsReturn } from "../services/functions/tripsService";
import EnumUtils from "../services/EnumUtils";
import { ShowItinerarioViagemPageAsModal } from "./ShowPageAsModal/ShowItinerarioViagemPageAsModal";

interface IonChipTripStatusProps {
  status: string;
  slot?: 'start' | 'end'
}

export const IonChipTripStatus = (props: IonChipTripStatusProps) => {
  const ionChipColor = EnumUtils.getTripStatusEnumColor(props.status)
  const ionChipLabel = EnumUtils.getTripStatusEnumFormatted(props.status);

  // switch (props.status) {
  //   case tripStatus.pending:
  //     ionChipColor = "warning";
  //     ionChipLabel = "Pendente confirmação";
  //     break;
  //   case tripStatus.confirmed:
  //     ionChipColor = "success";
  //     ionChipLabel = "Confirmada";
  //     break;
  //   case tripStatus.canceled:
  //     ionChipColor = "medium";
  //     ionChipLabel = "Cancelada";
  //     break;
  //   case tripStatus.inProgress:
  //     ionChipColor = "secondary";
  //     ionChipLabel = "Em progresso";
  //     break;
  //   case tripStatus.finished:
  //     ionChipColor = "primary";
  //     ionChipLabel = "Finalizada";
  //     break;
  //   default:
  //     break;
  // }

  return (
    <>
      <IonChip slot={props.slot ? props.slot : 'end'} color={ionChipColor}>{ionChipLabel}</IonChip>
    </>
  );
};
interface ComponentProps {
  // itinerary: Itinerary;
  // tripStatus?: string;
  tripInfo: GetFeedPropsReturn,

  slot?: string;
  // clickable: boolean;
  // tripId?: string;
}

export const CardTripFromFeed = (props: ComponentProps) => {
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
          handler: () => { },
        },
        {
          text: "Cancelar viagem",
          role: "cancelTrip",
          handler: () => { },
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => { },
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
    itineraryNickname: string,
    tripId?: string
  ) => {
    await tripsService
      .getTodaysTripStatusByItineraryId(itineraryId)
      .then((response) => {
        switch (response) {
          case tripStatus.confirmed:
            if (tripId) redirectToTripPage(tripId);
            break;
          case tripStatus.pending:
            handleChooseActionTripAlert(itineraryId, itineraryNickname);
            break;
          default:
            break;
        }
      });
  };

  const isButtonClickable = (): boolean => {
    console.log(props.tripInfo)
    return false
  }

  return (
    <>
      <IonCard slot={props.slot}>

        {/* onClick={() => {
        if (!props.clickable) return;
        handleLoadTrip(
          "" + props.itinerary.id_itinerary,
          props.itinerary.itinerary_nickname
        );
      }} */}
        {props.tripInfo && (
          <IonCardHeader>

            <IonCardSubtitle>

            </IonCardSubtitle>

            <IonCardTitle>{props.tripInfo.itinerary.itinerary_nickname}</IonCardTitle>
          </IonCardHeader>
        )}

        <IonCardContent>
          <div className="addresses-itinerary">
            <IonIcon icon={locateOutline} className="mr-1"></IonIcon>
            {props.tripInfo.itinerary.estimated_departure_address}
          </div>
          <div className="icons-location-divider">|</div>
          <div className="addresses-itinerary">
            <IonIcon icon={locationOutline} className="mr-1"></IonIcon>
            {props.tripInfo.itinerary.destinations && props.tripInfo.itinerary.destinations.map((destination) => {
              if (destination.is_final) {
                return <>{destination.formatted_address}</>;
              }
              return undefined;
            })}
          </div>

          <IonList>
            <IonItem lines='none'>
              <IonIcon icon={returnDownForwardOutline} />
              <IonLabel className="ml-2">Viagem de ida</IonLabel>
            </IonItem>
            <IonItem lines='none'>
              Status:
              <IonChipTripStatus status={props.tripInfo.tripGoing.status} />
            </IonItem>
            {props.tripInfo.tripGoing && props.tripInfo.tripGoing.id ? (
              <IonChip color='secondary' id='modal-trip-going'>
                <IonIcon icon={eyeOutline} />
                <IonLabel>Ver detalhes da viagem</IonLabel>
              </IonChip>
            ) : (
              <IonItem onClick={() => {
                handleChooseActionTripAlert("" + props.tripInfo.itinerary.id_itinerary, props.tripInfo.itinerary.itinerary_nickname)
              }}>
                Confirmar viagem de ida
                <IonChip slot='end' color='secondary'>
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>Ir</IonLabel>
                </IonChip>
              </IonItem>
            )}

            {props.tripInfo.tripReturn && (
              <div className="mt-1" aria-disabled={props.tripInfo.tripReturn.status === tripStatus.pendingGoingTrip}>
                <IonItem lines='none' disabled={props.tripInfo.tripReturn.status === tripStatus.pendingGoingTrip}>
                  <IonIcon icon={returnUpBackOutline} />
                  <IonLabel className="ml-2">Viagem de volta</IonLabel>
                </IonItem>
                <IonItem lines='none' disabled={props.tripInfo.tripReturn.status === tripStatus.pendingGoingTrip}>
                  Status:
                </IonItem>
                <IonItem lines='none' disabled={props.tripInfo.tripReturn.status === tripStatus.pendingGoingTrip}>
                  <IonChipTripStatus status={props.tripInfo.tripReturn.status} />
                </IonItem>

                {props.tripInfo.tripReturn && props.tripInfo.tripReturn.id ? (
                  <IonChip color='secondary' id='modal-trip-return' disabled={props.tripInfo.tripReturn.status === tripStatus.pendingGoingTrip}>
                    <IonIcon icon={eyeOutline} />
                    <IonLabel>Ver detalhes da viagem</IonLabel>
                  </IonChip>
                ) : (
                  <IonItem onClick={() => {
                    handleChooseActionTripAlert("" + props.tripInfo.itinerary.id_itinerary, props.tripInfo.itinerary.itinerary_nickname)
                  }} disabled={props.tripInfo.tripReturn.status === tripStatus.pendingGoingTrip}>
                    Confirmar viagem de retorno
                    <IonChip slot='end' color='secondary'>
                      <IonIcon icon={eyeOutline} />
                      <IonLabel>Ir</IonLabel>
                    </IonChip>
                  </IonItem>
                )}
              </div>
            )}
          </IonList>
        </IonCardContent>
      </IonCard>

      {props.tripInfo.tripGoing && props.tripInfo.tripGoing.id && <ShowItinerarioViagemPageAsModal id_trip={"" + props.tripInfo.tripGoing.id} trigger='modal-trip-going' hasButtonAlready />}
      {props.tripInfo.tripReturn && props.tripInfo.tripReturn.id && <ShowItinerarioViagemPageAsModal id_trip={"" + props.tripInfo.tripReturn.id} trigger='modal-trip-return' hasButtonAlready />}

    </>
  );
};
