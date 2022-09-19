import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
} from "@ionic/react";
import {
  arrowForwardOutline,
  chevronForwardOutline,
  locateOutline,
  locationOutline,
  timeOutline,
} from "ionicons/icons";
import "./BuscarItinerario.css";

import { useState } from "react";
import { useHistory } from "react-router";

import { PageHeader } from "../components/PageHeader";
import { Itinerary } from "../models/itinerary.model";
import { closeToast } from "../services/utils";

import { Color } from "@ionic/core";
import AutoCompleteInput from "../components/AutoCompleteInput";
import itinerariesService from "../services/functions/itinerariesService";

interface Address {
  formatted_address: string;
  lat: number;
  lng: number;
}

const BuscarItinerario: React.FC = () => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [addressFrom, setAddressFrom] = useState<Address>();
  const [coordinatesFrom, setCoordinatesFrom] = useState<any>("");
  const [addressTo, setAddressTo] = useState<Address>();
  const [coordinatesTo, setCoordinatesTo] = useState<any>("");

  const [recentSearches, setRecentSearches] = useState<any[]>([]);

  const [itinerariesList, setItinerariesList] = useState<Itinerary[]>();

  const [isScholar, setIsScholar] = useState<boolean>();
  const [period, setPeriod] = useState("");

  // const optionsAddress = async (inputValue: any) => {
  //   let results = await autoCompleteAddress(inputValue)
  //     .then((res) => {
  //       return res.map((item: any) => {
  //         return {
  //           value:
  //             item.geometry.coordinates[0] + "," + item.geometry.coordinates[1],
  //           label: item.properties.formatted,
  //         };
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("Erro ao buscar endereço:", err);
  //     });
  //   setAddressResults(results);
  // };

  // function setInputActiveOpenModal(input: string) {
  //   setInputActive(input);
  //   setShowModalEnd(true);
  // }

  // function setAddress(div: any) {
  //   if (inputActive === "from") {
  //     setAddressFrom(div.target.attributes[2].value);
  //     setCoordinatesFrom(div.target.attributes[1].value);
  //   } else {
  //     setAddressTo(div.target.attributes[2].value);
  //     setCoordinatesTo(div.target.attributes[1].value);
  //   }
  //   setShowModalEnd(false);
  // }

  async function buscarItinerarios() {
    if (!addressFrom) {
      setMessageToast("Por favor, escolha um endereço de origem!");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    if (!addressTo) {
      setMessageToast("Por favor, escolha um endereço de destino!");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    if (isScholar && !period) {
      setMessageToast("Por favor, escolha um período para a busca!");
      setToastColor("warning");
      setShowToast(true);
      return;
    }

    const maxRecentSearchesLength = 0;

    if (recentSearches.length >= maxRecentSearchesLength) {
      setRecentSearches(
        recentSearches.slice(recentSearches.length - maxRecentSearchesLength)
      );
    }

    setRecentSearches((arr) => [
      ...arr,
      {
        addressFrom: addressFrom.formatted_address,
        addressTo: addressTo.formatted_address,
        time: Date.now(),
      },
    ]);

    await itinerariesService
      .searchItineraries({
        coordinatesFrom: addressFrom,
        coordinatesTo: addressTo,
      })
      .then((response) => {
        // if (response.status === "error") {
        //   setToastColor("danger");
        //   setMessageToast(response.message);
        //   setShowToast(true);

        //   return;
        // }

        let searchState = {
          coordinatesFrom,
          coordinatesTo,
          addressFrom: addressFrom.formatted_address,
          addressTo: addressTo.formatted_address,
          period: "",
          itineraries: response,
        };

        if (isScholar) {
          searchState.period = period;
        }

        history.push({
          pathname: "/buscar/itinerario/lista",
          state: searchState,
        });

        // setItinerariesList(response);
      })
      .catch((err) => {
        setToastColor("danger");
        setMessageToast(err);
        setShowToast(true);
      });
  }

  function fillSearchBars(addressFrom: string, addressTo: string) {
    // setAddressFrom(addressFrom);
    // setAddressTo(addressTo);
  }

  return (
    <IonPage>
      <PageHeader
        pageName="Buscar itinerários"
        backButtonPageUrl="/buscas"
      ></PageHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonList lines="inset">
              <IonItem>
                <div className="inputs-from-to">
                  <IonIcon icon={locateOutline}></IonIcon>
                  <AutoCompleteInput
                    placeholder="R. José Paulino, 1234"
                    className="ml-2"
                    onAddressSelected={(address: Address) =>
                      setAddressFrom(address)
                    }
                  />
                </div>
              </IonItem>

              <IonItem>
                <div className="inputs-from-to">
                  <IonIcon icon={locationOutline}></IonIcon>
                  <AutoCompleteInput
                    placeholder="PUC Campinas"
                    className="ml-2"
                    onAddressSelected={(address: Address) =>
                      setAddressTo(address)
                    }
                  />
                </div>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Trata-se de itinerário escolar?</IonLabel>
                <IonCheckbox
                  checked={isScholar}
                  onIonChange={(e) => setIsScholar(e.detail.checked)}
                />
              </IonItem>

              {isScholar && (
                <IonItem>
                  <IonLabel>Período</IonLabel>
                  <IonSelect
                    value={period}
                    onIonChange={(e: any) => {
                      setPeriod(e.detail.value);
                    }}
                  >
                    <IonSelectOption value="diurnal">Diurno</IonSelectOption>
                    <IonSelectOption value="evening">
                      Vespertino
                    </IonSelectOption>
                    <IonSelectOption value="integral">Integral</IonSelectOption>
                    <IonSelectOption value="night">Noturno</IonSelectOption>
                  </IonSelect>
                </IonItem>
              )}

              <div className="button-search">
                <IonButton color="primary" onClick={() => buscarItinerarios()}>
                  Buscar
                </IonButton>
              </div>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonItemDivider color="dark">Pesquisas recentes</IonItemDivider>

        {recentSearches && recentSearches.length !== 0 ? (
          <>
            <IonRow class="latest-searches">
              {recentSearches.map((search, index) => {
                return (
                  <div key={index}>
                    <IonRow
                      class="latest-searches"
                      onClick={() => {
                        fillSearchBars(search.addressFrom, search.addressTo);
                      }}
                    >
                      <IonIcon
                        className="icon-align-vcenter"
                        size="large"
                        icon={timeOutline}
                      ></IonIcon>
                      <div className="div_from_to">
                        <span>{search.addressFrom}</span>
                        <IonIcon icon={arrowForwardOutline}></IonIcon>
                        <span>{search.addressTo}</span>
                        <br />
                        <small>{search.time}</small>
                      </div>
                      <IonIcon
                        className="icon-forward icon-align-vcenter"
                        size="large"
                        icon={chevronForwardOutline}
                      ></IonIcon>
                    </IonRow>
                  </div>
                );
              })}
            </IonRow>
          </>
        ) : (
          <>
            <div className="m-3">
              <h1 className="mb-3 text-xl">Sem pesquisas recentes...</h1>
            </div>
          </>
        )}

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

export default BuscarItinerario;
