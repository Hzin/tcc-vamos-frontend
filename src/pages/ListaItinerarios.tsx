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

import * as itinerariesService from "../services/functions/itinerariesService";

interface addressInfo {
  formatted_address: string;
  lat: number;
  lng: number;
}

interface InfoBusca {
  addressFrom: addressInfo;
  addressTo: addressInfo;
  period: string;

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
      props.addressFrom.lat,
      props.addressFrom.lng,
      props.addressTo.formatted_address
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
      coordinatesFrom: {
        lat: props.addressFrom.lat,
        lng: props.addressFrom.lng,
      },
      coordinatesTo: {
        lat: props.addressTo.lat,
        lng: props.addressTo.lng,
      },
      period: props.period,
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
              Origem: {props.addressFrom.formatted_address}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              Destino: {props.addressTo.formatted_address}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonToolbar color={"primary"}>
          <IonTitle>Resultados</IonTitle>
          <IonButtons slot={"end"}>
            {itinerariesList && itinerariesList.length !== 0 && (
              <IonButton onClick={() => setShowModalFilters(true)}>
                <IonLabel>Filtros</IonLabel>
                <IonIcon icon={filterOutline} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>

        <IonItemDivider color="secondary">Resultados</IonItemDivider>

        {itinerariesList && itinerariesList.length !== 0 ? (
          <>
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
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Não foi encontrado nenhum itinerário que atenda essa rota.
              </h1>
              <h2 className="mb-3 text-l">
                Deseja criar um alerta para ser notificado caso haja itinerário
                para essa origem e destino?
              </h2>
              <div className="button-criar-alerta">
                <IonButton onClick={() => criaAlerta()}>Criar Alerta</IonButton>
              </div>
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
                  interface={"action-sheet"}
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
                  <IonLabel>Preço</IonLabel>
                  <IonRadio value="price" />
                </IonItem>

                <IonItem>
                  <IonLabel>Avaliação</IonLabel>
                  <IonRadio value="rating" />
                </IonItem>

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
              <IonItem>
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
              </IonItem>
            </IonList>
          </IonContent>

          <IonFooter>
            <IonButton expand="block" onClick={() => applyFilters()}>
              Aplicar filtros
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
