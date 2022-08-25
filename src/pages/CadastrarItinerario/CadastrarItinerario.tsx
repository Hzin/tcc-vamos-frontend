import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, locateOutline, locationOutline } from "ionicons/icons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function CadastrarItinerario() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastrar Itinerário</IonTitle>
          <IonButtons slot="start">
            <IonBackButton icon={close} text="" defaultHref="/perfil" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="m-3">
          <h1>Digite o endereço de onde você iniciará a rota do itinerário</h1>
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
          <div className="button-search">
            <IonButton color="primary">Cadastrar</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
