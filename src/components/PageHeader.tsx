import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface ComponentProps {
  pageName?: string;
  backButtonPageUrl?: string;
  backButtonIcon?: string;
}

export const PageHeader = (props: ComponentProps) => (
  <IonHeader translucent>
    <IonToolbar>
      <IonTitle>{props.pageName}</IonTitle>
      <IonButtons slot="start">
        <IonBackButton
          text=""
          defaultHref={
            props.backButtonPageUrl ? props.backButtonPageUrl : undefined
          }
          icon={props.backButtonIcon ? props.backButtonIcon : undefined}
        />
      </IonButtons>
    </IonToolbar>
  </IonHeader>
);
