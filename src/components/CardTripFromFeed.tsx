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
import {
  eyeOutline,
  locateOutline,
  locationOutline,
  returnDownForwardOutline,
  returnUpBackOutline,
} from "ionicons/icons";
import { Color } from "@ionic/core";

import { tripStatus } from "../constants/tripStatus";

import * as tripsService from "../services/functions/tripsService";

import { reloadPage } from "../services/utils";

import { useHistory } from "react-router";
import {
  GetFeedPropsReturn,
} from "../services/functions/tripsService";
import { ShowItinerarioViagemPageAsModal } from "./ShowPageAsModal/ShowItinerarioViagemPageAsModal";
import { Separator } from "./Separator";
import { VehiclePicture } from "./VehiclePicture";
import { useEffect } from "react";
import { IonChipTripStatus } from "./IonChipTripStatus";
import { ChipInfo } from "./ChipInfo";
import { TripType } from "../models/tripType.models";

interface ComponentProps {
  // itinerary: Itinerary;
  // tripStatus?: string;
  tripInfo: GetFeedPropsReturn;

  slot?: string;
  // clickable: boolean;
  // tripId?: string;
}

export const CardTripFromFeed = (props: ComponentProps) => {
  const history = useHistory();

  const [presentAlert] = useIonAlert();
  const [presentAlertConfirmation] = useIonAlert();

  useEffect(() => {
    if (props.tripInfo.tripReturn && props.tripInfo.tripReturn.id) {
      // não pode mais mexer nas opções da viagem de ida
    }
  }, []);

  const refreshPage = (message: string, toastColor: Color) => {
    history.push({
      pathname: "/feed/meus/motorista",
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

  const createTrip = async ({
    itineraryId,
    tripType,
    newStatus
  }: tripsService.CreateTripProps) => {
    await tripsService
      .createTrip({
        itineraryId,
        tripType,
        newStatus
      })
      .then((response) => {
        refreshPage("Viagem atualizada com sucesso!", "success");
      });
  };

  const handleConfirmActionTripAlert = async (
    itineraryId: string,
    action: string,
    tripType: "going" | "return"
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

        console.log('action: ' + action)

        switch (action) {
          case "cancelTrip":
            createTrip({
              itineraryId,
              tripType,
              newStatus: tripStatus.canceled,
            });
            break;
          case "confirmTrip":
            createTrip({
              itineraryId,
              tripType,
              newStatus: tripStatus.confirmed,
            });
            break;
          default:
            break;
        }
      },
    });
  };

  const handleChooseActionTripAlert = (
    tripType: "going" | "return",
    itineraryId: string,
    itineraryNickname: string
  ) => {
    let headerMessage = `A viagem de ida de "${itineraryNickname}" está pendente`;
    if (tripType === "return")
      headerMessage = `A viagem de volta de "${itineraryNickname}" está pendente`;

    presentAlert({
      header: headerMessage,
      message: "Deseja confirmar a viagem?",
      buttons: [
        {
          text: "Confirmar viagem",
          role: "confirmTrip",
        },
        {
          text: "Cancelar viagem",
          role: "cancelTrip",
        },
        {
          text: "Cancelar",
          role: "cancel",
        },
      ],
      onDidDismiss: (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;

        handleConfirmActionTripAlert(itineraryId, e.detail.role, tripType);
      },
    });
  };

  const redirectToTripPage = (id_trip: number) => {
    history.push({
      pathname: `/viagem/${id_trip}`,
    });
  };

  const handleLoadTrip = async (
    tripType: "going" | "return",
    itineraryId: string,
    itineraryNickname: string,
    tripId?: number
  ) => {
    if (!tripId) {
      handleChooseActionTripAlert(tripType, itineraryId, itineraryNickname);
      return
    }

    await tripsService
      .getTodaysTripStatusByItineraryId(itineraryId)
      .then((response) => {
        switch (response) {
          case tripStatus.confirmed:
            if (tripId) redirectToTripPage(tripId);
            break;
          case tripStatus.pending:
            handleChooseActionTripAlert(
              tripType,
              itineraryId,
              itineraryNickname
            );
            break;
          default:
            break;
        }
      });
  };

  return (
    <>
      <IonCard slot={props.slot}>
        <VehiclePicture
          picture_path={props.tripInfo.itinerary.vehicle.picture}
        />

        <IonCardHeader>
          <IonCardTitle>
            {props.tripInfo.itinerary.itinerary_nickname}
          </IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <div className="addresses-itinerary">
            <IonIcon icon={locateOutline} className="mr-1"></IonIcon>
            {props.tripInfo.itinerary.estimated_departure_address}
          </div>
          <div className="icons-location-divider">|</div>
          <div className="addresses-itinerary">
            <IonIcon icon={locationOutline} className="mr-1"></IonIcon>
            {props.tripInfo.itinerary.destinations &&
              props.tripInfo.itinerary.destinations.map((destination) => {
                if (destination.is_final) {
                  return <>{destination.formatted_address}</>;
                }
                return undefined;
              })}
          </div>

          <Separator />

          <IonList>
            <IonItem lines="none">
              <IonIcon icon={returnDownForwardOutline} />
              <IonLabel className="ml-2">Viagem de ida</IonLabel>

              <ChipInfo infoString={
                [
                  'A viagem de ida não pode ser alterada depois do horário de finalização.',
                  'A viagem de ida também não poderá ser alterada se a viagem de volta for iniciada. Mesmo se a viagem de volta for cancelada, você não poderá mais alterar a viagem de ida.'
                ]
              } />
            </IonItem>
            <IonItem lines="none">
              Status
              <IonChipTripStatus status={props.tripInfo.tripGoing.status} />
            </IonItem>

            {props.tripInfo.tripGoing && props.tripInfo.tripGoing.id ? (
              <IonItem lines="none" id='modal-trip-going'>
                Detalhes da viagem de ida
                <IonChip slot="end" color="secondary">
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>Ir</IonLabel>
                </IonChip>
              </IonItem>
            ) : (
              <IonItem
                lines="none"
                onClick={() => {
                  handleLoadTrip(
                    "going",
                    "" + props.tripInfo.itinerary.id_itinerary,
                    props.tripInfo.itinerary.itinerary_nickname,
                    props.tripInfo.tripGoing.id
                  );
                }}
              >
                Confirmar viagem de ida
                <IonChip slot="end" color="success">
                  <IonIcon icon={eyeOutline} />
                  <IonLabel>Ir</IonLabel>
                </IonChip>
              </IonItem>
            )}

            {props.tripInfo.tripReturn && (
              <>
                <Separator />

                <div className="mt-4">
                  <IonItem lines="none">
                    <IonIcon icon={returnUpBackOutline} />
                    <IonLabel className="ml-2">Viagem de volta</IonLabel>

                    <ChipInfo infoString={['A viagem de volta pode ser iniciada somente se a viagem de ida for finalizada ou cancelada.']} />
                  </IonItem>

                  <IonItem lines="none">
                    Status
                    <IonChipTripStatus status={props.tripInfo.tripReturn.status} />
                  </IonItem>

                  {props.tripInfo.tripReturn && props.tripInfo.tripReturn.id ? (
                    <IonChip color="secondary" id="modal-trip-return">
                      <IonIcon icon={eyeOutline} />
                      <IonLabel>Ver detalhes da viagem</IonLabel>
                    </IonChip>
                  ) : (
                    <IonItem lines="none">
                      Confirmar viagem de retorno
                      <IonChip
                        slot="end"
                        color="success"
                        disabled={
                          props.tripInfo.tripReturn.status ===
                          tripStatus.pendingGoingTrip
                        }
                        onClick={() => {
                          handleLoadTrip(
                            "return",
                            "" + props.tripInfo.itinerary.id_itinerary,
                            props.tripInfo.itinerary.itinerary_nickname,
                            props.tripInfo.tripGoing.id
                          );
                        }}
                      >
                        <IonIcon icon={eyeOutline} />
                        <IonLabel>Ir</IonLabel>
                      </IonChip>
                    </IonItem>
                  )}
                </div>
              </>
            )}
          </IonList>
        </IonCardContent>
      </IonCard>

      {props.tripInfo.tripGoing && props.tripInfo.tripGoing.id && (
        <ShowItinerarioViagemPageAsModal
          id_trip={"" + props.tripInfo.tripGoing.id}
          tripType={TripType.going}
          isReturnTripCreated={props.tripInfo.tripReturn && props.tripInfo.tripReturn.id ? true : false}

          trigger="modal-trip-going"
          hasButtonAlready
        />
      )}
      {props.tripInfo.tripReturn && props.tripInfo.tripReturn.id && (
        <ShowItinerarioViagemPageAsModal
          id_trip={"" + props.tripInfo.tripReturn.id}
          tripType={TripType.return}
          trigger="modal-trip-return"
          hasButtonAlready
        />
      )}
    </>
  );
};
