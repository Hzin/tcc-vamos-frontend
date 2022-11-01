import { IonModal, IonContent, IonLabel, IonIcon, IonButton, IonChip, IonFooter, IonToolbar, IonBackButton, IonButtons, IonHeader } from "@ionic/react";
import { informationOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import { Color } from "@ionic/core";
import { reloadPage } from "../services/utils";

export interface RedirectData {
  url: string,
  toastColor: Color,
  toastMessage: string,
}

interface ComponentProps {
  id: string;
  isOpen: boolean;
  messages: string[];
  redirectData?: RedirectData;
}

export const ModalInfoEntendi = (props: ComponentProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>();

  useEffect(() => {
    setMessages(props.messages)
    setIsOpen(props.isOpen)
  }, [props])

  const history = useHistory();

  const handleDismissModal = () => {
    modal.current?.dismiss()

    if (!props.redirectData) return

    history.push({
      pathname: props.redirectData.url,
      state: {
        redirectData: {
          showToastMessage: true,
          toastColor: props.redirectData.toastColor,
          toastMessage: props.redirectData.toastMessage,
        },
      },
    });

    // TODO, gambiarra
    reloadPage()
  }

  return (
    <IonModal ref={modal} trigger="open-modal" isOpen={isOpen}>
      {/* <IonHeader> */}
      <IonToolbar>
        <IonChip>
          <IonIcon icon={informationOutline} />
          <IonLabel>Informação</IonLabel>
        </IonChip>
        <IonButtons slot="end">
          <IonButton fill="solid" onClick={handleDismissModal}>Fechar</IonButton>
        </IonButtons>
      </IonToolbar>
      {/* </IonHeader> */}

      <IonContent className="ion-padding">
        <div className="h-[100px] leading-[100px] text-center">
          {messages ? (
            messages.map((message, index) => {
              return (
                <span key={index} className="text-xl inline-block align-middle leading-normal">{" "}{message}</span>
              )
            })
          ) : <span className="text-xl inline-block align-middle leading-normal">Carregando...</span>}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButton onClick={handleDismissModal} expand="full">Entendi</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  )
}