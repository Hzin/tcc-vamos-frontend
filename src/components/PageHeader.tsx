import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
// import { InputHTMLAttributes } from "react";

// interface ComponentProps extends InputHTMLAttributes<HTMLIonHeaderElement> {
interface ComponentProps {
  pageName?: string;
  backButtonPageUrl?: string;
  backButtonIcon?: string;
}

export const PageHeader = (props: ComponentProps) => (
    <IonHeader translucent>
    <IonToolbar>
      {props.pageName ? (
        <>
          <IonTitle>{props.pageName}</IonTitle>
        </>
      ) : (
        <></>
      )}
      
      <IonButtons slot="start">
        <IonBackButton text="" defaultHref={ props.backButtonPageUrl ? props.backButtonPageUrl : undefined } />
          icon={ props.backButtonIcon ? props.backButtonIcon : undefined }
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);
