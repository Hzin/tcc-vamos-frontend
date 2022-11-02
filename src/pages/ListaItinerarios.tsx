import {
  IonContent,
  IonPage,
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
  IonItemDivider,
  IonList,
  IonTitle,
  IonButtons,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import {
  closeOutline,
  filterOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { createUserSearch } from "../services/api/users";
import { closeToast } from "../services/utils";
import { Itinerary } from "../models/itinerary.model";
import { PageHeader } from "../components/PageHeader";

import * as itinerariesService from "../services/functions/itinerariesService";

import { CardItinerary } from "../components/CardItinerary";

interface coordinatesInfo {
  formatted_address: string;
  lat: number;
  lng: number;
}

interface InfoBusca {
  coordinatesFrom: coordinatesInfo;
  coordinatesTo: coordinatesInfo;
  period: string;

  itineraries: Itinerary[];
}

const ListaItinerarios: React.FC = () => {
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
    "" | "monthly_price" | "daily_price" | "rating" | "available_seats"
  >("");

  const [preference_AvulseSeat, setPreference_AvulseSeat] =
    useState<boolean>(false);
  const [preference_A_C, setPreference_A_C] = useState<boolean>(false);
  const [preference_PrioritySeat, setPreference_PrioritySeat] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.itineraries) {
      setItinerariesList(props.itineraries);

      return
    }

    if (!props.coordinatesFrom || !props.coordinatesTo || !props.period) return

    searchItineraries(
      props.coordinatesFrom,
      props.coordinatesTo,
      props.period
    )
  }, [props]);

  const searchItineraries = async (coordinatesFrom: coordinatesInfo, coordinatesTo: coordinatesInfo, period: string) => {
    // TODO, trocar
    // await itinerariesService.searchItineraries(
    // {
    //   coordinatesFrom,
    //   coordinatesTo,
    //   period
    // }
    await itinerariesService.getAllItineraries()
      .then((response) => {
        setItinerariesList(response)
      });
  }

  function criaAlerta() {
    createUserSearch(
      props.coordinatesFrom.lat,
      props.coordinatesFrom.lng,
      props.coordinatesTo.formatted_address
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
        lat: props.coordinatesFrom.lat,
        lng: props.coordinatesFrom.lng,
      },
      coordinatesTo: {
        lat: props.coordinatesTo.lat,
        lng: props.coordinatesTo.lng,
      },
      period: props.period,
      orderBy,
      orderOption,
      preference_AvulseSeat,
      preference_A_C,
      preference_PrioritySeat,
    };

    await itinerariesService
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
        <IonCard button color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              Origem: {props.coordinatesFrom.formatted_address}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard button color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              Destino: {props.coordinatesTo.formatted_address}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

        <IonToolbar color={"primary"}>
          <IonTitle>Resultados</IonTitle>
          <IonButtons slot={"end"}>
            {itinerariesList && itinerariesList.length !== 0 && (
              <IonButton onClick={() => setShowModalFilters(true)}>
                <IonIcon icon={filterOutline} />
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>

        {itinerariesList && itinerariesList.length !== 0 ? (
          itinerariesList.map((itinerary, index) => {
            return (<CardItinerary key={index} itinerary={itinerary} />)
          })
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
                  <IonLabel>Preço mensal</IonLabel>
                  <IonRadio value="monthly_price" />
                </IonItem>

                <IonItem>
                  <IonLabel>Preço diário</IonLabel>
                  <IonRadio value="daily_price" />
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
