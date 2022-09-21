import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItemDivider,
  IonPage,
  IonRow,
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
import { Itinerary } from "../models/itinerary.model";
import { closeToast } from "../services/utils";

import { Color } from "@ionic/core";
import AutoCompleteInput from "../components/AutoCompleteInput";
import { searchItineraries } from "../services/functions/itinerariesService";

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
    if (!addressFrom || !addressTo) {
      return;
    }

    const maxRecentSearchesLength = 0;;

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

    await searchItineraries({
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

        history.push({
          pathname: "/buscar/itinerario/lista",
          state: {
            coordinatesFrom,
            coordinatesTo,
            addressFrom,
            addressTo,
            itineraries: response,
          },
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
            <div className="flex items-center">
              <IonIcon icon={locateOutline}></IonIcon>
              <AutoCompleteInput
                placeholder="R. José Paulino, 1234"
                className="ml-2"
                onAddressSelected={(address: Address) =>
                  setAddressFrom(address)
                }
              />
            </div>
            <div className="flex items-center">
              <IonIcon icon={locationOutline}></IonIcon>
              <AutoCompleteInput
                placeholder="PUC Campinas"
                className="ml-2"
                onAddressSelected={(address: Address) => setAddressTo(address)}
              />
            </div>
            <div className="flex justify-center mt-[50%]">
              <IonButton color="primary" onClick={() => buscarItinerarios()}>
                Buscar
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {recentSearches && recentSearches.length !== 0 ? (
          <>
            <IonItemDivider color="dark">Pesquisas recentes</IonItemDivider>
            <IonRow class="m-[1rem]">
              {recentSearches.map((search, index) => {
                return (
                  <div key={index}>
                    <IonRow
                       
                      class="m-[1rem]"
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
          <></>
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
