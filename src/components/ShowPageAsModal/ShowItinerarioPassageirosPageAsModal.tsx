import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";

import ItinerarioPassageiros, { ItinerarioPassageirosProps } from "../../pages/ItinerarioPassageiros";

interface ShowItinerarioPassageirosPageAsModalProps extends ItinerarioPassageirosProps {
  trigger: string
  hasButtonAlready?: boolean
}

export const ShowItinerarioPassageirosPageAsModal = (props: ShowItinerarioPassageirosPageAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <ItinerarioPassageiros
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