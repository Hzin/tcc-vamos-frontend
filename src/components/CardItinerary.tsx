import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonLabel } from "@ionic/react";
import { cashOutline, cashSharp, timeOutline, timeSharp } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Itinerary } from "../models/itinerary.model";

import { convertNumberToPrice, getUserFullName } from "../services/utils";
import { VehiclePicture } from "./VehiclePicture";

interface ComponentProps {
  itinerary: Itinerary;
}

interface CardInfo {
  icon: string,
  label: string,
  value: string
}

export const CardItinerary = (props: ComponentProps) => {
  const history = useHistory();

  const [cardInfo, setCardInfo] = useState<CardInfo[]>([])
  const [cardTimeInfo, setCardTimeInfo] = useState<CardInfo[]>([])

  useEffect(() => {
    let cardInfoArray: CardInfo[] = []

    cardInfoArray.push({
      icon: cashSharp,
      label: 'Mensalidade',
      value: convertNumberToPrice(props.itinerary.monthly_price)
    })

    if (props.itinerary.daily_price) {
      cardInfoArray.push({
        icon: cashOutline,
        label: 'Vaga avulsa',
        value: convertNumberToPrice(props.itinerary.daily_price)
      })
    }

    let cardTimeInfoArray: CardInfo[] = []

    cardTimeInfoArray.push({
      icon: timeOutline,
      label: 'Horário de saída estimado',
      value: formatTimeField(props.itinerary.estimated_departure_time)
    })

    cardTimeInfoArray.push({
      icon: timeSharp,
      label: 'Horário de chegada estimado',
      value: formatTimeField(props.itinerary.estimated_arrival_time)
    })

    setCardInfo(cardInfoArray)
    setCardTimeInfo(cardTimeInfoArray)
  }, [])

  const formatTimeField = (time: string) => {
    const separator = ':'

    const timeSplit = time.split(separator)
    
    if (timeSplit.length !== 3) return time

    timeSplit.pop()
    if (!timeSplit) return time

    return timeSplit.join(separator)
  }

  return (
    <IonCard button>
      <VehiclePicture picture_path={props.itinerary.vehicle.picture}  />

      <IonCardHeader>
        {props.itinerary.itinerary_nickname && (<IonCardSubtitle className="text-[13px]">Apelido: "{props.itinerary.itinerary_nickname}"</IonCardSubtitle>)}
        <IonCardSubtitle className="text-[13px]">Motorista: {getUserFullName(props.itinerary.user)}</IonCardSubtitle>
        <IonCardTitle>Van de Nome do motorista</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {cardInfo && cardInfo.length !== 0 ? (
          <>
            {
              cardInfo.map((info, index) => (
                <div key={index}>
                  <IonIcon icon={info.icon} />
                  <IonLabel>{" "}{info.label}: {info.value}</IonLabel>
                </div>
              ))
            }
          </>
        ) : <></>}

        {cardTimeInfo && cardTimeInfo.length !== 0 ? (
          <>
            <div className="mt-4">
              {
                cardTimeInfo.map((info, index) => (
                  <div key={index}>
                    <IonIcon icon={info.icon} />
                    <IonLabel>{" "}{info.label}: {info.value}</IonLabel>
                  </div>
                ))
              }
            </div>
          </>
        ) : <></>}

      </IonCardContent>
      <IonButton fill="clear" className="float-right" onClick={() => { history.push(`/itinerary/${props.itinerary.id_itinerary}`); }}>Ver detalhes</IonButton>
    </IonCard>
  );
}