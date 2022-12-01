import {
    IonChip,
    IonIcon,
    IonItem,
    IonLabel,
    useIonAlert,
  } from "@ionic/react";
  import { useEffect, useState } from "react";
  
  import { eyeOutline, informationOutline } from "ionicons/icons";
    
  interface ComponentProps {
    infoString: string | string[]
  }
  
  export const ChipInfo = (props: ComponentProps) => {
    const [presentAlert] = useIonAlert();
  
    const [info, setInfo] = useState<string[]>()
  
    useEffect(() => {
      Array.isArray(props.infoString) ? setInfo(props.infoString) : setInfo([props.infoString])
    }, [props])
  
    const handleShowAlert = (info: string[] | undefined) => {
      let infoAsString: string = ''
  
      if (!info) infoAsString = '<p>Sem informações.</p>'
  
      else {
        infoAsString = info.map((item) => {
          return `<p>${item}</p>`
        }).join('\n')
      }
  
      presentAlert({
        header: 'Informação',
        message: infoAsString,
        buttons: ['Entendi'],
      },
      );
    };
  
    return (
      <>
        <IonChip color='secondary' onClick={() => { handleShowAlert(info) }}>
          <IonIcon icon={informationOutline} />
          <IonLabel>Informações</IonLabel>
        </IonChip>
      </>
    );
  }
  