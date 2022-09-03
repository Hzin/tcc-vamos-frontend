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
import { PageHeader } from "../../components/PageHeader";

export default function CadastrarItinerario() {
  const [selected, setSelected] = useState<any>("");

  return (
    <IonPage>
      <PageHeader
        pageName="Cadastrar itinerário"
        backButtonPageUrl="/perfil"
      ></PageHeader>
      
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <div className="inputs-from-to">
              <IonIcon icon={locateOutline}></IonIcon>
              <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_KEY_API}
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
                apiKey={process.env.REACT_APP_KEY_API}
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
