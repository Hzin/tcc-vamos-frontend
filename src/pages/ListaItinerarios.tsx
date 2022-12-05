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
import { useHistory, useLocation } from "react-router";

import { closeToast } from "../services/utils";
import { Itinerary } from "../models/itinerary.model";
import { PageHeader } from "../components/PageHeader";

import * as itinerariesService from "../services/functions/itinerariesService";
import * as searchesService from "../services/functions/searchesService";

import { CardItinerary } from "../components/CardItinerary";

import { SearchData, ContractData } from "../constants/InterfaceContractInfo";

interface LocationState {
  itineraries?: Itinerary[];
  searchData: SearchData;
  contractData: ContractData;
}

const ListaItinerarios: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const props = location.state as LocationState;

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

    if (!props.searchData) history.goBack()

    searchItineraries({
      lat_origin: props.searchData.lat_origin,
      lng_origin: props.searchData.lng_origin,
      lat_destination: props.searchData.lat_destination,
      lng_destination: props.searchData.lng_destination,
      period: props.searchData.period
    }
    )
  }, [props]);

  interface SearchItinerariesBody {
    lat_origin: number, lng_origin: number, lat_destination: number, lng_destination: number, period: string
  }

  const searchItineraries = async ({ lat_origin, lng_origin, lat_destination, lng_destination, period }: SearchItinerariesBody) => {
    const itineraries = await itinerariesService.searchItineraries({
      coordinatesFrom: {
        lat: lat_origin,
        lng: lng_origin,
      },
      coordinatesTo: {
        lat: lat_destination,
        lng: lng_destination,
      },
      period
    })
    // const itineraries = await itinerariesService.getAllItineraries()
    setItinerariesList(itineraries)
  }

  function criaAlerta() {
    searchesService.create({
      latitude_from: props.searchData.lat_origin,
      longitude_from: props.searchData.lng_origin,
      latitude_to: props.searchData.lat_destination,
      longitude_to: props.searchData.lng_destination,
      address_to: props.searchData.formatted_address_destination
    }).then(() => {
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
        lat: props.searchData.lat_origin,
        lng: props.searchData.lng_origin,
      },
      coordinatesTo: {
        lat: props.searchData.lat_destination,
        lng: props.searchData.lng_destination,
      },
      period: props.searchData.period,
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
              Origem: {props.searchData.formatted_address_origin}
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard button color="light">
          <IonCardHeader>
            <IonCardSubtitle>
              Destino: {props.searchData.formatted_address_destination}
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
            return (
              <CardItinerary
                key={index}
                itinerary={itinerary}
                searchData={props.searchData}
                visualizeButton={
                  {
                    onClick: () => {
                      history.push({
                        pathname: `/itinerario/id/${itinerary.id_itinerary}`,
                        state: {
                          searchData: props.searchData,
                          contractData: props.contractData
                        }
                      })
                    }
                  }
                }
              />
            )
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
