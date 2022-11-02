import { IonModal, IonButton, IonFooter, IonToolbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

interface ComponentProps {
  page: React.FC<any>,
  isOpen: boolean
  paramId?: string
}

export const ShowPageAsModal = (props: ComponentProps) => {
  const modal = useRef<HTMLIonModalElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props])

  const handleDismissModal = () => {
    modal.current?.dismiss()
  }

  return (
    <IonModal ref={modal} trigger="open-modal" isOpen={isOpen}>
      {/* <IonContent className="ion-padding">
      </IonContent> */}

      <props.page paramId={props.paramId} />

      <IonFooter>
        <IonToolbar>
          <IonButton onClick={handleDismissModal} expand="full">Voltar</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  )
}