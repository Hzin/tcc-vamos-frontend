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

  // useEffect(() => { }, [props])

  return (
    <IonCard button={!!props.onClickFunction} onClick={props.onClickFunction} {...otherProps}>
      <img id="user_pic" alt="user_pic" className="block ml-auto mr-auto h-auto max-w-[160px]" src={props.contract.user.avatar_image} />
      <IonCardHeader>
        <IonCardSubtitle className="text-[13px]">Nome: {getUserFullName(props.contract.user)}</IonCardSubtitle>
        <IonCardTitle>Itinerário: {props.contract.itinerary.itinerary_nickname}</IonCardTitle>
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