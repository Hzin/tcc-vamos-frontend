import { IonButton, IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage } from "@ionic/react";
import { calendarClearOutline, eyeOutline, informationOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import { PageHeader } from "../components/PageHeader";

import * as tripsService from "../services/functions/tripsService"

import { Trip } from "../models/trip.model";
import EnumUtils from "../services/EnumUtils";
import { ShowItinerarioViagensPageAsModal } from "../components/ShowPageAsModal/ShowItinerarioViagensPageAsModal";
import { ShowItinerarioViagemPageAsModal } from "../components/ShowPageAsModal/ShowItinerarioViagemPageAsModal";
import { TripType } from "../models/tripType.models";

export interface ItinerarioViagensProps {
  id_itinerary: string

  noHeaderBackButton?: boolean
}

const ItinerarioViagens: React.FC<ItinerarioViagensProps> = (props) => {
  const [trips, setTrips] = useState<Trip[]>()

  const [paramsIdTrip, setParamsIdTrip] = useState('')
  const [paramsTripType, setParamsTripType] = useState<TripType>()

  useEffect(() => {
    if (!props.id_itinerary) return

    getTripsByItineraryId(props.id_itinerary)
    getItineraryTodaysTrips();
  }, [])

  const getTripsByItineraryId = async (id_itinerary: string) => {
    const trips = await tripsService.getTripsByItineraryId(id_itinerary)
    setTrips(trips)
  }

  const showTripInfo = (trip: Trip) => {
    setParamsIdTrip("" + trip.id_trip)
    setParamsTripType(trip.type)
    document.getElementById('modal-viagem')?.click()
  }

  const getItineraryTodaysTrips = () => {
    // props.id_itinerary
  }

  return (
    <IonPage>
      <PageHeader pageName="Viagens" />

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Viagens</IonListHeader>
          {(trips && trips.length !== 0) ? (
            trips.map((trip, index) => {
              return (
                <div key={index}>
                  <IonItem lines="none">
                    <IonIcon icon={calendarClearOutline} />
                    <IonLabel className="ml-2">Data: {trip.date}</IonLabel>
                    <IonChip color='secondary' onClick={() => { showTripInfo(trip) }}>
                      <IonIcon icon={eyeOutline} />
                      <IonLabel>Ver informações</IonLabel>
                    </IonChip>
                  </IonItem>

                  <IonItem>
                    <IonChip color='secondary'>
                      <IonIcon icon={informationOutline} />
                      <IonLabel>Status: {EnumUtils.getTripStatusEnumFormatted(trip.status)}</IonLabel>
                    </IonChip>

                    {trip.nickname &&
                      <>
                        <IonChip color='secondary'>
                          <IonIcon icon={informationOutline} />
                          <IonLabel>Apelido: {trip.nickname}</IonLabel>
                        </IonChip>
                      </>
                    }

                  </IonItem>
                </div>
              )
            })
          ) : (
            <>
              <h1 className="m-6">
                Esse itinerário ainda não possui nenhuma viagem.
              </h1>
            </>
          )}
        </IonList>

        { paramsTripType && <ShowItinerarioViagemPageAsModal trigger='modal-viagem' id_trip={paramsIdTrip} tripType={paramsTripType} /> }
      </IonContent>

      <IonButton className="invisible" id='modal-passenger' />
    </IonPage>
  );
};

export default ItinerarioViagens