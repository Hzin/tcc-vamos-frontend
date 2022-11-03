import {
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";

import { eyeOutline } from "ionicons/icons";

import { Destination } from "../models/destination.model";
import { NeighborhoodServed } from "../models/NeighborhoodServed.model";

import { getFormatedAddresses } from "../services/utils";

interface ComponentProps {
  label: string;
  icon?: string;
  infoString?: string | string[]
  infoObject?: NeighborhoodServed[] | Destination[]
  // infoUser?: User
}

export const ItemItineraryDetailVer = (props: ComponentProps) => {
  const [presentAlert] = useIonAlert();

  const [info, setInfo] = useState('')

  useEffect(() => {
    // if (!props.infoString && !props.infoObject && !props.infoUser) {
    if (!props.infoString && !props.infoObject) {
      setInfo('Sem informações.')
      return
    }

    if (props.infoString) Array.isArray(props.infoString) ? setInfo(props.infoString.join('\n')) : setInfo(props.infoString)
    if (props.infoObject) setInfo(getFormatedAddresses(props.infoObject).join('\n'))
    // if (props.infoUser) setInfo(convertObjectToString(props.infoUser).join('\n'))
  }, [props])

  const handleShowAlert = (header: string, info: string) => {
    presentAlert({
      header: header,
      message: info,
      buttons: ['Ok'],
    },
    );
  };

  return (
    <>
      <IonItem onClick={() => { handleShowAlert(props.label, info) }}>
        <IonLabel>{props.label}</IonLabel>
        <IonChip color='secondary'>
          <IonIcon icon={eyeOutline} />
          <IonLabel>Ver</IonLabel>
        </IonChip>
      </IonItem>
    </>
  );
}
