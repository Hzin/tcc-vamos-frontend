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

import { convertObjectToStringArray, getFormatedAddresses } from "../services/utils";

interface ComponentProps {
  label: string;
  icon?: string;
  infoString?: string | string[]
  infoObject?: any
  infoPlacesObject?: NeighborhoodServed[] | Destination[]
  // infoUser?: User
}

export const ItemItineraryDetailVer = (props: ComponentProps) => {
  const [presentAlert] = useIonAlert();

  const [info, setInfo] = useState<string[]>()

  useEffect(() => {
    if (props.infoString) {
      Array.isArray(props.infoString) ? setInfo(props.infoString) : setInfo([props.infoString])
    }

    if (props.infoObject) setInfo(convertObjectToStringArray(props.infoObject))

    if (props.infoPlacesObject) setInfo(getFormatedAddresses(props.infoPlacesObject))

    // if (props.infoUser) setInfo(convertObjectToStringArray(props.infoUser))
  }, [props])

  const handleShowAlert = (header: string, info: string[] | undefined) => {
    let infoAsString: string = ''

    if (!info) infoAsString = '<p>Sem informações.</p>'

    else {
      infoAsString = info.map((item) => {
        return `<p>${item}</p>`
      }).join('\n')
    }

    presentAlert({
      header: header,
      message: infoAsString,
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
