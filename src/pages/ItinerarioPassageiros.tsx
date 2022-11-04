import { IonButton, IonChip, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage } from "@ionic/react";
import { cashOutline, eyeOutline, personOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { ShowPageAsModal } from "../components/ShowPageAsModal";

import * as passengersService from "../services/functions/passengersService"

import { Passenger } from "../models/passenger.model";
import { getUserFullName } from "../services/utils";
import Perfil from "./Perfil";

interface ScanNewProps {
  id_itinerary: string

  noHeaderBackButton?: boolean
}

const ItinerarioPassageiros: React.FC<ScanNewProps> = (props) => {
  const [passengers, setPassengers] = useState<Passenger[]>()

  const [selectedUserId, setSelectedUserId] = useState('')

  useEffect(() => {
    if (!props.id_itinerary) return

    getPassengersByItineraryId(props.id_itinerary)
  }, [])

  const getPassengersByItineraryId = async (id_itinerary: string) => {
    const passengers = await passengersService.getByItineraryId(id_itinerary)
    setPassengers(passengers)
  }

  const showPassengerProfile = (id_user: string) => {
    setSelectedUserId(id_user)
    document.getElementById('modal-passenger')?.click()
  }

  return (
    <IonPage>
      <PageHeader pageName="Passageiros" showBackButton={!props.noHeaderBackButton} />

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>Passageiros</IonListHeader>
          {(passengers && passengers.length !== 0) ? (
            passengers.map((passenger, index) => {
              return (
                <div key={index}>
                  <IonItem lines="none">
                    <IonIcon icon={personOutline} />
                    <IonLabel className="ml-2">{getUserFullName(passenger.user)}</IonLabel>
                    <IonChip color='secondary' onClick={() => { showPassengerProfile(passenger.user_id) }}>
                      <IonIcon icon={eyeOutline} />
                      <IonLabel>Ver perfil</IonLabel>
                    </IonChip>
                  </IonItem>

                  <IonItem>
                    <IonChip color='secondary'>
                      <IonIcon icon={cashOutline} />
                      <IonLabel>Status de pagamento: {passenger.payment_status ? 'Em dia' : 'Atrasado'}</IonLabel>
                    </IonChip>
                  </IonItem>
                </div>
              )
            })
          ) : (
            <>
              <h1 className="m-6">
                Esse itinerário ainda não possui nenhum passageiro.
              </h1>
            </>
          )}
        </IonList>

        <ShowPageAsModal page={Perfil} paramId={selectedUserId} trigger='modal-passenger' />
      </IonContent>

      <IonButton className="invisible" id='modal-passenger' />
    </IonPage>
  );
};

export default ItinerarioPassageiros