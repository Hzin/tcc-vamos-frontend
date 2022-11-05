import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";

import ItinerarioViagens, { ItinerarioViagensProps } from "../../pages/ItinerarioViagens";

interface ShowItinerarioPassageirosPageAsModalProps extends ItinerarioViagensProps {
  trigger: string
  hasButtonAlready?: boolean
}

export const ShowItinerarioViagensPageAsModal = (props: ShowItinerarioPassageirosPageAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <ItinerarioViagens
          id_itinerary={props.id_itinerary}
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