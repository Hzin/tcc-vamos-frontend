
import {
  IonContent,
  IonPage,
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";

import { alarmOutline, bookmarkOutline, documentOutline, idCardOutline } from "ionicons/icons";

import * as tripsService from "../services/functions/tripsService";
import * as sessionsService from "../services/functions/sessionsService";
import * as passengersRequestsService from "../services/functions/passengersRequestsService";

import { PageHeader } from "../components/PageHeader";
import { CardItinerary } from "../components/CardItinerary";
import { Trip } from "../models/trip.model";
import ContratoResumo from "./ContratoResumo";
import { ShowContratoResumoPageAsModal } from "../components/ShowPageAsModal/ShowContratoResumoPageAsModal";

export interface ViagemProps {
  match?: {
    params: {
      id: string;
    };
  };

  id_trip?: string

  noHeaderBackButton?: boolean
}

const Viagem: React.FC<ViagemProps> = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const [trip, setTrip] = useState<Trip>();

  const [paramIdPassengerRequest, setParamIdPassengerRequest] = useState('');

  const history = useHistory();

  useEffect(() => {
    if (props.id_trip) getTripInfo(props.id_trip)
    else if (props.match) getTripInfo(props.match.params.id)
    else history.goBack()
  }, [])

  const getTripInfo = async (id_trip: string) => {
    const trip = await tripsService.getTrip(id_trip)
    setTrip(trip)
    getContractInfo(trip)
  }

  const getContractInfo = async (trip: Trip) => {
    const user = await sessionsService.refreshSession()

    if (!user.userId) return

    const passengerRequest = await passengersRequestsService.searchByIdUserAndIdItinerary(user.userId, "" + trip.itinerary_id)

    if (!passengerRequest) return

    setParamIdPassengerRequest("" + passengerRequest.id_passenger_request)
  }

  const showContract = () => {
    document.getElementById('modal-contrato')?.click()
  }

  return (
    <IonPage>
      <PageHeader pageName="Viagem" showBackButton={!props.noHeaderBackButton} />

      <IonContent fullscreen>
        {trip && (
          <>
            {trip.itinerary && (<CardItinerary itinerary={trip.itinerary} onlyHeader />)}

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={() => { }} fill="outline" color="Blue" >
                    Faltar na proxima viagem
                  </IonButton>
                </IonCol>
              </IonRow>

              <IonItem>
                <IonIcon icon={idCardOutline} slot="start" />
                <IonLabel>Motorista: Maria</IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon icon={alarmOutline} slot="start" />
                <IonLabel>Horario: 09:45</IonLabel>
              </IonItem>

              <IonItem>
                <IonIcon icon={bookmarkOutline} slot="start" />
                <IonLabel>Status: Ativo</IonLabel>
              </IonItem>

              {paramIdPassengerRequest && (
                <>
                  <IonItem button onClick={showContract}>
                    <IonIcon icon={documentOutline} slot="start" />
                    <IonLabel>Meu Contrato</IonLabel>
                  </IonItem>
                </>
              )}
            </IonGrid>
          </>
        )}

        <IonToast
          position="top"
          color='danger'
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={2500}
        />

        <ShowContratoResumoPageAsModal trigger="modal-contrato" id_passenger_request={paramIdPassengerRequest} noHeaderBackButton />
      </IonContent>
    </IonPage>
  );
};

export default Viagem;