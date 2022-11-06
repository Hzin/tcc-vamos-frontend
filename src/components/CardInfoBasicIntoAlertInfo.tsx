import { useIonAlert } from "@ionic/react";

import { CardInfoBasic, ComponentProps as CardInfoBasicComponentProps } from "./CardInfoBasic";

interface ComponentProps extends CardInfoBasicComponentProps {
  alertMessage: string
}

export const CardInfoBasicIntoAlertInfo = (props: ComponentProps) => {
  const [presentAlert] = useIonAlert();

  const handleShowAlert = () => {
    presentAlert({
      header: "Informação",
      message: props.alertMessage,
      buttons: ['Entendi'],
    },
    );
  };

  return (
    <div onClick={handleShowAlert}>
      <CardInfoBasic message={props.message} size={props.size} />
    </div>
  )
}