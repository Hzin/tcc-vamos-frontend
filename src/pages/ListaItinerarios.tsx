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
  IonList,
  IonListHeader,
  IonTitle,
  IonButtons,
} from "@ionic/react";
import {
  cashOutline,
  closeOutline,
  personOutline,
  starOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { createUserSearch } from "../services/api/users";
import { closeToast, convertNumberToPrice } from "../services/utils";
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
  const [showModalFilters, setShowModalFilters] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState("success");

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
      <PageHeader
        pageName="Resultados da busca"
        backButtonPageUrl="/buscar/itinerario"
      />
      <IonContent fullscreen>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>Origem: {props.addressFrom.label}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardSubtitle>Destino: {props.addressTo.label}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>

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
            <div className="m-6">
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
                  <div className="flex justify-center items-center mt-5">
                    <IonButton onClick={() => criaAlerta()}>
                      Criar Alerta
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          </>
        )}

        <IonFab
          onClick={() => setShowModalFilters(true)}
          vertical="bottom"
          horizontal="center"
          slot="fixed"
        >
          <IonFabButton>Filtros</IonFabButton>
        </IonFab>
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
              <IonListHeader>Ordenar por</IonListHeader>
              <IonRadioGroup>
                <IonItem>
                  <IonLabel>Sem filtro</IonLabel>
                  <IonRadio value="sem_filtro" />
                </IonItem>

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
            </IonList>

            <IonItemDivider />

            <IonList>
              <IonListHeader>Preferências</IonListHeader>
              <IonItem>
                <IonLabel>Vaga avulsa</IonLabel>
                <IonCheckbox value="vaga_avulsa" />
              </IonItem>
              <IonItem>
                <IonLabel>Ar condicionado</IonLabel>
                <IonCheckbox value="ar_condicionado" />
              </IonItem>
              <IonItem>
                <IonLabel>Assento preferencial</IonLabel>
                <IonCheckbox value="assento_preferencial" />
              </IonItem>
            </IonList>
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
