import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, locateOutline, locationOutline } from "ionicons/icons";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function CadastrarItinerario() {
  const [selected, setSelected] = useState<any>("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={close} text="" defaultHref="/perfil" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cadastrar Itinerário</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardContent>
            <div className="inputs-from-to">
              <IonIcon icon={locateOutline}></IonIcon>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyAGfCsaNwxwyj4Ajtfy7MTNADE6JwmnZvA"
                apiOptions={{ language: "pt-br", region: "br" }}
                selectProps={{
                  className: "input-autocomplete",
                  placeholder: "R. José Paulino, 1234",
                }}
              />
            </div>
            <div className="inputs-from-to">
              <IonIcon icon={locationOutline}></IonIcon>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyAGfCsaNwxwyj4Ajtfy7MTNADE6JwmnZvA"
                apiOptions={{ language: "pt-br", region: "br" }}
                selectProps={{
                  className: "input-autocomplete",
                  placeholder: "PUC Campinas",
                }}
              />
            </div>
            <IonList>
              <IonRadioGroup
                value={selected}
                onIonChange={(e) => setSelected(e.detail.value)}
              >
                <IonListHeader>
                  <IonLabel>Name</IonLabel>
                </IonListHeader>

                <IonItem>
                  <IonLabel>Biff</IonLabel>
                  <IonRadio slot="start" value="biff" />
                </IonItem>

                <IonItem>
                  <IonLabel>Griff</IonLabel>
                  <IonRadio slot="start" value="griff" />
                </IonItem>

                <IonItem>
                  <IonLabel>Buford</IonLabel>
                  <IonRadio slot="start" value="buford" />
                </IonItem>
              </IonRadioGroup>
            </IonList>
            <div className="button-search">
              <IonButton color="primary">Cadastrar</IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
