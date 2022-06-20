import {
  IonBadge,
  IonButton,
  IonCardSubtitle,
  IonCol,
  IonIcon,
  IonNote,
  IonRow,
} from "@ionic/react";
import {
  arrowForward,
  call,
  callOutline,
  navigateOutline,
} from "ionicons/icons";
import "./UserSearchInfos.css";

export const UserSearchInfos = (record: any) => {
  console.log(record.record);
  return (
    <div className="overlayContainer">
      <IonCardSubtitle>{record.record.user.name}</IonCardSubtitle>
      {/* <IonNote color="medium">{ record.record.addressFrom }</IonNote> */}
      <IonBadge color="dark">
        {record.record.user.star_rating
          ? `${record.record.user.star_rating} estrelas`
          : "Sem avaliações"}
      </IonBadge>

      <p>
        <IonIcon icon={navigateOutline} size='large' />
        &nbsp;{record.record.address_to}
      </p>

      {record.record.user.phone_number && (
        <p>
          <IonIcon icon={call} />
          &nbsp;{record.record.user.phone_number}
        </p>
      )}

      <IonRow className="ion-no-padding ion-no-margin ion-margin-top">
        <IonCol size="12" className="ion-no-padding ion-no-margin">
          <IonButton
            color="primary"
            fill="solid"
            size="small"
            expand="block"
            routerLink={`/perfil/${record.record.user.id_user}`}
          >
            Ver mais informações &rarr;
          </IonButton>
        </IonCol>
      </IonRow>

      <IonRow className="ion-no-padding ion-no-margin">
        <IonCol size="12" className="ion-no-padding ion-no-margin">
          <IonButton color="primary" fill="outline" size="small" expand="block">
            <IonIcon icon={callOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </div>
  );
};
