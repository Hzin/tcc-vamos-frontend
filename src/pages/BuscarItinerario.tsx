import {
  IonButton,
  IonCard,
  IonCardContent,
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

import { useState } from "react";
import { useHistory } from "react-router";

import { PageHeader } from "../components/PageHeader";
import { closeToast } from "../services/utils";

import { Color } from "@ionic/core";
import AutoCompleteInput from "../components/AutoCompleteInput";
import { SearchData, ContractData } from "../constants/InterfaceContractInfo";
import { schoolPeriods } from "../constants/schoolPeriods";

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
  const [addressTo, setAddressTo] = useState<Address>();

  const [period, setPeriod] = useState();

  const [recentSearches, setRecentSearches] = useState<any[]>([]);

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

    if (!period) {
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

    const searchData: SearchData = {
      period,
      lat_origin: addressFrom.lat,
      lng_origin: addressFrom.lng,
      formatted_address_origin: addressFrom.formatted_address,
      lat_destination: addressTo.lat,
      lng_destination: addressTo.lng,
      formatted_address_destination: addressTo.formatted_address,
    }

    history.push({
      pathname: "/buscar/itinerario/lista",
      state: {
        // itineraries,
        searchData
      },
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
                <div className="flex items-center">
                  <IonIcon icon={locateOutline} />
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
                <div className="flex items-center">
                  <IonIcon icon={locationOutline} />
                  <AutoCompleteInput
                    placeholder="PUC Campinas"
                    className="ml-2"
                    onAddressSelected={(address: Address) =>
                      setAddressTo(address)
                    }
                  />
                </div>
              </IonItem>

              <IonItem>
                <IonLabel>Período</IonLabel>
                <IonSelect
                  value={period}
                  placeholder="Período"
                  onIonChange={(e: any) => {
                    setPeriod(e.detail.value);
                  }}
                >
                  <IonSelectOption value={schoolPeriods.diurnal}>Diurno</IonSelectOption>
                  <IonSelectOption value={schoolPeriods.evening}>Vespertino</IonSelectOption>
                  <IonSelectOption value={schoolPeriods.integral}>Integral</IonSelectOption>
                  <IonSelectOption value={schoolPeriods.night}>Noturno</IonSelectOption>
                </IonSelect>
              </IonItem>

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
            <IonRow className="m-[1rem]">
              {recentSearches.map((search, index) => {
                return (
                  <div key={index}>
                    <IonRow
                      className="m-[1rem]"
                      onClick={() => {
                        fillSearchBars(search.addressFrom, search.addressTo);
                      }}
                    >
                      <IonIcon
                        className="self-center"
                        size="large"
                        icon={timeOutline}
                      ></IonIcon>
                      <div className="max-w-[70%]">
                        <span>{search.addressFrom}</span>
                        <IonIcon icon={arrowForwardOutline}></IonIcon>
                        <span>{search.addressTo}</span>
                        <br />
                        <small>{search.time}</small>
                      </div>
                      <IonIcon
                        className="ml-auto mr-0 self-center"
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
