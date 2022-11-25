import { IonChip, IonIcon, IonItem, IonLabel, IonToast } from "@ionic/react";
import { useState } from "react";

import { Color } from "@ionic/core";

import { closeToast, DaysOfWeekObject } from "../services/utils";
import { calendarClearOutline } from "ionicons/icons";

interface ComponentProps {
  itineraryDaysOfWeek: DaysOfWeekObject;
  showCalendarIcon?: boolean
}

export const ChipsItineraryDaysOfWeek = (props: ComponentProps) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const presentToast = (message: string, isTrue: boolean) => {
    setToastColor(isTrue ? 'success' : 'danger')
    setToastMessage(message)
    setShowToast(true)
  }

  return (
    <>
      <IonItem lines="none">
        <IonIcon className={props.showCalendarIcon ? 'visible' : 'invisible'} icon={props.showCalendarIcon ? calendarClearOutline : undefined} />
        <IonLabel className="ml-2">Dias da semana</IonLabel>
      </IonItem>
      <IonItem>
        <div className="ml-auto mr-auto">
          <IonChip color={props.itineraryDaysOfWeek.sunday ? 'success' : 'danger'} onClick={() => { presentToast('Domingo', props.itineraryDaysOfWeek.sunday) }}>D</IonChip>
          <IonChip color={props.itineraryDaysOfWeek.monday ? 'success' : 'danger'} onClick={() => { presentToast('Segunda-feira', props.itineraryDaysOfWeek.monday) }}>S</IonChip>
          <IonChip color={props.itineraryDaysOfWeek.tuesday ? 'success' : 'danger'} onClick={() => { presentToast('Terça-feira', props.itineraryDaysOfWeek.tuesday) }}>T</IonChip>
          <IonChip color={props.itineraryDaysOfWeek.wednesday ? 'success' : 'danger'} onClick={() => { presentToast('Quarta-feira', props.itineraryDaysOfWeek.wednesday) }}>Q</IonChip>
          <IonChip color={props.itineraryDaysOfWeek.thursday ? 'success' : 'danger'} onClick={() => { presentToast('Quinta-feira', props.itineraryDaysOfWeek.thursday) }}>QQ</IonChip>
          <IonChip color={props.itineraryDaysOfWeek.friday ? 'success' : 'danger'} onClick={() => { presentToast('Sexta-feira', props.itineraryDaysOfWeek.friday) }}>S</IonChip>
          <IonChip color={props.itineraryDaysOfWeek.saturday ? 'success' : 'danger'} onClick={() => { presentToast('Sábado', props.itineraryDaysOfWeek.saturday) }}>SS</IonChip>
        </div>
        {/* </div> */}
      </IonItem>

      <IonToast
        position="bottom"
        color={toastColor}
        isOpen={showToast}
        onDidDismiss={() => closeToast(setShowToast)}
        message={toastMessage}
        duration={2500}
        cssClass="text-center max-w-[50%]"
      />
    </>
  );
}