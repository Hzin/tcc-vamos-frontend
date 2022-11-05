import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";

import Perfil, { PerfilProps } from "../../pages/Perfil";

interface ShowItinerarioPassageirosPageAsModalProps extends PerfilProps {
  trigger: string
  hasButtonAlready?: boolean
}

export const ShowPerfilPageAsModal = (props: ShowItinerarioPassageirosPageAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <Perfil
          id_user={props.id_user}
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