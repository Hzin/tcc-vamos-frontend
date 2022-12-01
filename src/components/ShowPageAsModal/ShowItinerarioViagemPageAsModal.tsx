import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";

import Viagem, { ViagemProps } from "../../pages/Viagem";

interface ShowItinerarioPassageirosPageAsModalProps extends ViagemProps {
  trigger: string
  hasButtonAlready?: boolean
}

export const ShowItinerarioViagemPageAsModal = (props: ShowItinerarioPassageirosPageAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <Viagem
          id_trip={props.id_trip}
          tripType={props.tripType}

          isReturnTripCreated={props.isReturnTripCreated}
          
          noHeaderBackButton={props.noHeaderBackButton}
        />

        <IonFooter>
          <IonToolbar>
            <IonButton onClick={handleDismissModal} expand="full">Voltar</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>

      {!props.hasButtonAlready && (<IonButton className="invisible" id={props.trigger} />)}
    </>
  )
}