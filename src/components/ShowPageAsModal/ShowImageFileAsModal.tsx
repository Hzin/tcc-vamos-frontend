import { useRef } from "react";
import { IonModal, IonButton, IonFooter, IonToolbar, IonContent, IonCard, IonCardContent } from "@ionic/react";
import { PageHeader } from "../PageHeader";

interface ShowImageFileAsModalProps {
  trigger: string

  url: string
  title?: string

  hasButtonAlready?: boolean
}

export const ShowImageFileAsModal = (props: ShowImageFileAsModalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <>
      <IonModal ref={modal} trigger={props.trigger}>
        <PageHeader pageName={props.title ? props.title : "Arquivo"} />
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <img alt="" src={props.url} />
            </IonCardContent>
          </IonCard>
        </IonContent>

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