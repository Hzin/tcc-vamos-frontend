import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface ComponentProps {
  pageName?: string;
  showBackButton?: boolean;
  backButtonPageUrl?: string;
  backButtonIcon?: string;
}

export const PageHeader = (props: ComponentProps) => (
  <IonHeader translucent>
    <IonToolbar>
      <IonTitle>{props.pageName}</IonTitle>
      {(props.backButtonPageUrl || props.showBackButton) && (
        <IonButtons slot="start">
          <IonBackButton
            text=""
            defaultHref={props.backButtonPageUrl}
            icon={props.backButtonIcon}
          />
        </IonButtons>
      )}
    </IonToolbar>
  </IonHeader>
);
