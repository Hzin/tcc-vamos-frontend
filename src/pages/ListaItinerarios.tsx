import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonButton,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonModal,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonCheckbox,
  IonFooter,
  IonToast,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItemDivider,
} from "@ionic/react";
import {
  arrowForwardOutline,
  cashOutline,
  closeOutline,
  personOutline,
  starOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { createUserSearch } from "../services/api/users";
import "./ListaItinerarios.css";
import { closeToast } from "../services/utils";
import { Itinerary } from "../models/itinerary.model";
import { PageHeader } from "../components/PageHeader";

interface InfoBusca {
  addressFrom: any;
  addressTo: any;
  coordinatesFrom: any;
  coordinatesTo: any;

  itineraries: Itinerary[];
}

const ListaItinerarios: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const props = location.state as InfoBusca;
  const [itinerariesList, setItinerariesList] = useState<Itinerary[]>([]);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState("success");

  useEffect(() => {
    if (props.itineraries) {
      setItinerariesList(props.itineraries);
    }
  }, [props]);

  useEffect(() => {
    if (props.itineraries) {
      setItinerariesList(props.itineraries);
    }
  }, [props]);

  function criaAlerta() {
    createUserSearch(
      props.coordinatesFrom.lat,
      props.coordinatesFrom.lng,
      props.addressTo.label
    )
      .then(() => {
        setMessageToast("Alerta criado com sucesso!");
        setShowToast(true);
      })
      .catch((err: any) => {
        setMessageToast("Não foi possível criar o alerta!");
        setToastColor("danger");
        setShowToast(true);
      });
  }

  return (
    <IonPage>
      <PageHeader pageName="Itinerários" backButtonPageUrl="" />
      <IonHeader>
        <div className="header-page">
          {/* <IonButtons slot="start">
            <IonBackButton text={'aaaa'} icon={arrowBack} defaultHref='buscar-transporte' />
          </IonButtons> */}
          <span className="span-info-back">
            <div className="address-from-to">
              <span>{props.addressFrom.label}</span>
              <IonIcon icon={arrowForwardOutline} />
              <span>{props.addressTo.label}</span>
              <small>Hoje</small>
            </div>
          </span>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        {itinerariesList && itinerariesList.length !== 0 ? (
          <>
            <IonItemDivider color="secondary">Resultados</IonItemDivider>
            {itinerariesList.map((itinerary, index) => {
              return (
                <IonCard
                  button
                  key={index}
                  onClick={() => {
                    history.push(`/itinerary/${itinerary.id_itinerary}`);
                  }}
                >
                  <IonCardHeader>
                    <IonCardTitle>{itinerary.itinerary_nickname}</IonCardTitle>
                    <IonCardSubtitle>
                      <p>
                        <IonIcon icon={personOutline} /> Vagas disponíveis:{" "}
                        {itinerary.available_seats}
                      </p>
                      <p>
                        <IonIcon icon={starOutline} /> Motorista:{" "}
                        {itinerary.price}
                      </p>
                      <p>
                        <IonIcon icon={cashOutline} /> Valor:{" "}
                        {itinerary.vehicle_plate}
                      </p>
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              );
            })}
          </>
        ) : (
          <h1 className="msg-not-found">
            Não foi encontrado nenhum itinerário que atenda essa rota.
          </h1>
        )}

        <div className="button-criar-alerta">
          <IonButton onClick={() => criaAlerta()}>Criar Alerta</IonButton>
        </div>

        <IonFab
          onClick={() => setShowModalFilters(true)}
          vertical="bottom"
          horizontal="center"
          slot="fixed"
        >
          <IonFabButton>Filtros</IonFabButton>
        </IonFab>
        <IonModal isOpen={showModalFilters}>
          <IonToolbar>
            <div className="header-filter-modal">
              <IonIcon
                size="large"
                icon={closeOutline}
                onClick={() => setShowModalFilters(false)}
              />
              <h4>
                <b>Limpar</b>
              </h4>
            </div>
          </IonToolbar>
          <IonContent>
            <div className="content-filter-modal">
              <h1>Filtrar</h1>
              <h3>Ordernar por</h3>
              <IonRadioGroup>
                <IonItem>
                  <IonLabel>Menor preço</IonLabel>
                  <IonRadio value="menor_preco" />
                </IonItem>

                <IonItem>
                  <IonLabel>Avaliação</IonLabel>
                  <IonRadio value="avaliacao" />
                </IonItem>

                <IonItem>
                  <IonLabel>Lugares disponíveis</IonLabel>
                  <IonRadio value="lugares_disponiveis" />
                </IonItem>
              </IonRadioGroup>
              <h3>Preferências</h3>
              <IonItem>
                <IonLabel>Vaga avulsa</IonLabel>
                <IonCheckbox value="vaga_avulsa" />
              </IonItem>
              <IonItem>
                <IonLabel>Ar condicionado</IonLabel>
                <IonCheckbox value="ar_condicionado" />
              </IonItem>
            </div>
          </IonContent>
          <IonFooter>
            <IonButton
              expand="block"
              onClick={() => setShowModalFilters(false)}
            >
              Aplicar Filtros
            </IonButton>
          </IonFooter>
        </IonModal>
        <IonToast
          // cssClass={"toast-notification"}
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default ListaItinerarios;
