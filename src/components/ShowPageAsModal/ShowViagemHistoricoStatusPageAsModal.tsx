import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";

import ViagemHistoricoStatus, { ViagemHistoricoStatusProps } from "../../pages/ViagemHistoricoStatus";

interface ShowViagemHistoricoStatusPageAsModalProps extends ViagemHistoricoStatusProps {
  trigger: string
  hasButtonAlready?: boolean
}

export const ShowViagemHistoricoStatusPageAsModal = (props: ShowViagemHistoricoStatusPageAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <ViagemHistoricoStatus
          id_trip={props.id_trip}
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