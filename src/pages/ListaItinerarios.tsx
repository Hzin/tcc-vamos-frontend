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
  IonCardContent,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonListHeader,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  arrowForwardOutline,
  cashOutline,
  closeOutline,
  filterOutline,
  personOutline,
  starOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { createUserSearch } from "../services/api/users";
import "./ListaItinerarios.css";
import { closeToast, convertNumberToPrice } from "../services/utils";
import { Itinerary } from "../models/itinerary.model";
import { PageHeader } from "../components/PageHeader";

import itinerariesService from "../services/functions/itinerariesService";
import { Coordinates } from "../models/coordinates.model";

interface InfoBusca extends Coordinates {
  addressFrom: any;
  addressTo: any;
  coordinatesFrom: Coordinates;
  coordinatesTo: Coordinates;

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

  // filtros
  const [orderBy, setOrderBy] = useState<
    "ascending" | "descending" | undefined
  >("ascending");
  const [orderOption, setOrderOption] = useState<
    "" | "lower_price" | "ratings" | "available_seats"
  >("");

  const [preference_AvulseSeat, setPreference_AvulseSeat] =
    useState<boolean>(false);
  const [preference_A_C, setPreference_A_C] = useState<boolean>(false);
  const [preference_PrioritySeat, setPreference_PrioritySeat] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.itineraries) {
      setItinerariesList(props.itineraries);
    }
  }, [props]);

  function criaAlerta() {
    createUserSearch(
      props.coordinatesFrom.lat,
      props.coordinatesTo.lng,
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

  async function applyFilters() {
    const body = {
      coordinatesFrom: props.coordinatesFrom,
      coordinatesTo: props.coordinatesTo,
      orderBy,
      orderOption,
      preference_AvulseSeat,
      preference_A_C,
      preference_PrioritySeat,
    };

    await itinerariesService
      // .getAllItineraries()
      .searchItineraries(body)
      .then((response) => {
        setItinerariesList(response);
      })
      .catch((err) => {
        setToastColor("danger");
        setMessageToast(err);
        setShowToast(true);
      });
    setShowModalFilters(false);
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Resultados da busca"
        backButtonPageUrl="/buscar/itinerario"
      />
      <IonContent fullscreen>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              <b>Origem</b>: {props.addressFrom.label}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              <b>Destino</b>: {props.addressTo.label}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        {itinerariesList && itinerariesList.length !== 0 ? (
          <>
            <IonToolbar color={"primary"}>
              <IonTitle>Resultados</IonTitle>
              <IonButtons slot={"end"}>
                <IonButton onClick={() => setShowModalFilters(true)}>
                  <IonLabel>Filtros</IonLabel>
                  <IonIcon icon={filterOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            {itinerariesList.map((itinerary, index) => {
              return (
                <IonCard
                  color={"primary"}
                  button
                  key={index}
                  onClick={() => {
                    history.push(`/itinerary/${itinerary.id_itinerary}`);
                  }}
                >
                  <IonCardHeader>
                    <IonCardTitle>{itinerary.itinerary_nickname}</IonCardTitle>
                    <IonCardContent>
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
                        {convertNumberToPrice(itinerary.price)}
                      </p>
                    </IonCardContent>
                  </IonCardHeader>
                </IonCard>
              );
            })}
          </>
        ) : (
          <>
            <div className="msg-not-found">
              <IonCard>
                <IonCardContent>
                  <span>
                    Não foi encontrado nenhum itinerário que atenda essa rota.
                  </span>
                </IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <span>
                    Deseja criar um alerta para ser notificado caso haja
                    itinerário para essa origem e destino?
                  </span>
                  <div className="button-criar-alerta">
                    <IonButton onClick={() => criaAlerta()}>
                      Criar Alerta
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          </>
        )}

        <IonModal isOpen={showModalFilters}>
          <IonHeader translucent>
            <IonToolbar>
              <IonTitle>Filtros</IonTitle>
              <IonButtons slot="start">
                <IonIcon
                  size="large"
                  icon={closeOutline}
                  onClick={() => setShowModalFilters(false)}
                />
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonList>
              <IonToolbar color={"tertiary"}>
                <IonTitle>Ordernar por</IonTitle>
                <IonSelect
                  slot={"end"}
                  interface={'action-sheet'}
                  value={orderBy}
                  onIonChange={(e) => setOrderBy(e.detail.value)}
                >
                  <IonSelectOption value="ascending">Crescente</IonSelectOption>
                  <IonSelectOption value="descending">
                    Decrescente
                  </IonSelectOption>
                </IonSelect>
              </IonToolbar>

              <IonRadioGroup
                value={orderOption}
                onIonChange={(e: any) => setOrderOption(e.detail.value)}
              >
                <IonItem>
                  <IonLabel>Sem ordenação</IonLabel>
                  <IonRadio value="" />
                </IonItem>

                <IonItem>
                  <IonLabel>Menor preço</IonLabel>
                  <IonRadio value="lower_price" />
                </IonItem>

                {/* <IonItem>
                  <IonLabel>Avaliação</IonLabel>
                  <IonRadio value="ratings" />
                </IonItem> */}

                <IonItem>
                  <IonLabel>Lugares disponíveis</IonLabel>
                  <IonRadio value="available_seats" />
                </IonItem>
              </IonRadioGroup>
            </IonList>
            <IonItemDivider />
            <IonList>
              <IonToolbar color={"tertiary"}>
                <IonTitle>Preferências</IonTitle>
              </IonToolbar>
              <IonItem>
                <IonLabel>Vaga avulsa</IonLabel>
                <IonCheckbox
                  checked={preference_AvulseSeat}
                  onIonChange={(e: any) =>
                    setPreference_AvulseSeat(e.detail.checked)
                  }
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel>Ar condicionado</IonLabel>
                <IonCheckbox
                  checked={preference_A_C}
                  onIonChange={(e: any) => setPreference_A_C(e.detail.checked)}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Assento preferencial</IonLabel>
                <IonCheckbox
                  checked={preference_PrioritySeat}
                  onIonChange={(e: any) =>
                    setPreference_PrioritySeat(e.detail.checked)
                  }
                />
              </IonItem> */}
            </IonList>
          </IonContent>

          <IonFooter>
            <IonButton expand="block" onClick={() => applyFilters()}>
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