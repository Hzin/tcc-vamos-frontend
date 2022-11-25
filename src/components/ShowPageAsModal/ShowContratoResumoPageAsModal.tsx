import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";

import ContratoResumo, { ContratoResumoProps } from "../../pages/ContratoResumo";

interface ShowContratoResumoPageAsModalProps extends ContratoResumoProps {
  trigger: string
  hasButtonAlready?: boolean
}

export const ShowContratoResumoPageAsModal = (props: ShowContratoResumoPageAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <ContratoResumo
          id_itinerary={props.id_itinerary}
          id_passenger_request={props.id_passenger_request}

          searchData={props.searchData}

          passenger={props.passenger}
          itinerary={props.itinerary}

          noHeaderBackButton={props.noHeaderBackButton}
          showContractModerateButton={props.showContractModerateButton}
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