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
  UpdateTripStatusProps,
} from "../services/functions/tripsService";
import EnumUtils from "../services/EnumUtils";
import { ShowItinerarioViagemPageAsModal } from "./ShowPageAsModal/ShowItinerarioViagemPageAsModal";
import { Separator } from "./Separator";
import { VehiclePicture } from "./VehiclePicture";
import { useEffect } from "react";

interface IonChipTripStatusProps {
  status: string;
  slot?: "start" | "end";
}

export const IonChipTripStatus = (props: IonChipTripStatusProps) => {
  const ionChipColor = EnumUtils.getTripStatusEnumColor(props.status);
  const ionChipLabel = EnumUtils.getTripStatusEnumFormatted(props.status);

  return (
    <>
      <IonChip slot={props.slot ? props.slot : "end"} color={ionChipColor}>
        {ionChipLabel}
      </IonChip>
    </>
  );
};
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
    // console.log(props)
  }, []);

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
        console.log('response')
        console.log(response)

        // if (!response.data) {
        //   refreshPage("Houve um erro ao atualizar a viagem!", "warning");
        //   return;
        // }

        refreshPage("Viagem atualizada com sucesso!", "success");
      });
  };

  const updateTripStatus = async ({
    tripId,
    newStatus,
    description,
  }: UpdateTripStatusProps) => {
    await tripsService
      .updateTripStatus({
        tripId,
        newStatus,
        description,
      })
      .then((response) => {
        console.log('response')
        console.log(response)

        // if (!response.data) {
        //   refreshPage("Houve um erro ao atualizar a viagem!", "warning");
        //   return;
        // }

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

  const isButtonClickable = (): boolean => {
    console.log(props.tripInfo);
    return false;
  };

  useEffect(() => { }, []);

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
            </IonItem>
            <IonItem lines="none">
              Status:
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
                <IonChip slot="end" color="secondary">
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
                  </IonItem>

                  <IonItem lines="none">Status:</IonItem>
                  <IonItem lines="none">
                    <IonChipTripStatus
                      status={props.tripInfo.tripReturn.status}
                    />
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
                        color="secondary"
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
          trigger="modal-trip-going"
          hasButtonAlready
        />
      )}
      {props.tripInfo.tripReturn && props.tripInfo.tripReturn.id && (
        <ShowItinerarioViagemPageAsModal
          id_trip={"" + props.tripInfo.tripReturn.id}
          trigger="modal-trip-return"
          hasButtonAlready
        />
      )}
    </>
  );
};
