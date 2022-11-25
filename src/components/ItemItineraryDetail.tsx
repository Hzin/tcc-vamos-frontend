import {
  IonChip,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";

import { Color } from "@ionic/core";

interface ComponentProps {
  label: string;
  icon?: string;
  leftIcon?: string;
  value: string;
  secondValue?: string;
  color?: Color
}

export const ItemItineraryDetail = (props: ComponentProps) => (
  <>
    <IonItem>
      {props.leftIcon && (<IonIcon icon={props.leftIcon} />)}
      <IonLabel className={props.leftIcon ? 'ml-5' : ''}>{props.label}</IonLabel>

      {props.secondValue && (
        <>
          <IonChip className="min-w-[80px]" color={props.color}>
            <IonLabel className="text-center w-full">{props.secondValue}</IonLabel>
          </IonChip>
        </>
      )}

      <IonChip className="min-w-[80px]">
        {props.icon && (<IonIcon icon={props.icon} />)}
        <IonLabel className="text-center w-full">{props.value}</IonLabel>
      </IonChip>
    </IonItem>
  </>
);
