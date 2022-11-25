import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import { useEffect } from "react";

import type { JSX } from '@ionic/core/components';

import { VehiclePicture } from "./VehiclePicture";

import { PassengerRequest } from "../models/passengerRequest.model";
import { getUserFullName } from "../services/utils";

// interface ComponentProps {
interface ComponentProps extends JSX.IonCard {
  contract: PassengerRequest;

  onClickFunction?: () => void
}

export const CardContract = (props: ComponentProps) => {
  const {
    contract,
    onClickFunction,

    ...otherProps
  } = props

  useEffect(() => {
  }, [props])

  return (
    <IonCard button={!!props.onClickFunction} onClick={props.onClickFunction} {...otherProps}>
      <VehiclePicture picture_path={''} />
      <IonCardHeader>
        <IonCardSubtitle className="text-[13px]">Informação</IonCardSubtitle>
        <IonCardTitle>Nome: {getUserFullName(props.contract.user)}</IonCardTitle>
      </IonCardHeader>

      {/* <IonCardContent>
      </IonCardContent> */}

      <div className="mr-1">
        <IonButton
          fill="outline"
          className="float-right"
          onClick={onClickFunction}
        >Ver contrato</IonButton>
      </div>
    </IonCard>
  );
}