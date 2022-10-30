import { IonCard, IonCardContent, IonIcon, IonLabel } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

interface ComponentProps {
  message: string;
  size: 'small' | 'medium' | 'large'
}

export const CardInfoBasic = (props: ComponentProps) => {
  const [className, setClassName] = useState('')

  useEffect(() => {
    let fontSize = ''

    switch (props.size) {
      case 'small':
        fontSize = '12'
        break;
      case 'medium':
        fontSize = '18'
        break;
      case 'large':
        fontSize = '20'
        break;
      default:
        break;
    }

    setClassName(`text-[${fontSize}px]`)
  }, [])

  return (
    <IonCard>
      <IonCardContent className={className}>
        <IonIcon icon={informationCircleOutline}/>
        <IonLabel>{" "}{props.message}</IonLabel>
      </IonCardContent>
    </IonCard>
  )
}