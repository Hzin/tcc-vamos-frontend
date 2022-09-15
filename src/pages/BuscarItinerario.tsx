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
import "./BuscarItinerario.css";

import itinerariesService from "../services/functions/itinerariesService";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { PageHeader } from "../components/PageHeader";
import { closeToast } from "../services/utils";

import { Color } from "@ionic/core";

const BuscarItinerario: React.FC = () => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [addressFrom, setAddressFrom] = useState<any>("");
  const [coordinatesOrigin, setCoordinatesOrigin] = useState<any>("");
  const [addressTo, setAddressTo] = useState<any>("");
  const [coordinatesDestination, setCoordinatesDestination] = useState<any>("");

  const [recentSearches, setRecentSearches] = useState<any[]>([]);

  useEffect(() => {
    if (addressFrom.label && addressFrom.label.length > 0) {
      geocodeByAddress(addressFrom.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => setCoordinatesOrigin({ lat, lng }));
    }
  }, [addressFrom]);

  useEffect(() => {
    if (addressTo.label && addressTo.label.length > 0) {
      geocodeByAddress(addressTo.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => setCoordinatesDestination({ lat, lng }));
    }
  }, [addressTo]);

  async function buscarItinerarios() {
    if (!coordinatesOrigin || !coordinatesDestination || !addressFrom || !addressTo) {
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
        addressFrom: addressFrom.label,
        addressTo: addressTo.label,
        time: Date.now(),
      },
    ]);

    await itinerariesService
      // TODO, desfazer
      // .searchItineraries({
      //   coordinatesOrigin,
      //   coordinatesDestination,
      // })
      .getAllItineraries()
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
            coordinatesOrigin,
            coordinatesDestination,
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
            <div className="inputs-from-to">
              <IonIcon icon={locateOutline}></IonIcon>
              {/* <IonSearchbar
                showClearButton="never"
                onClick={() => setInputActiveOpenModal("from")}
                value={addressFrom}
                placeholder="R. José Paulino, 1234 - Centro, Campinas - SP, 13013-001"
              /> */}
              <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_KEY_API}
                apiOptions={{ language: "pt-br", region: "br" }}
                selectProps={{
                  value: addressFrom,
                  onChange: setAddressFrom,
                  className: "input-autocomplete",
                  placeholder: "R. José Paulino, 1234",
                }}
              />
            </div>
            <div className="inputs-from-to">
              <IonIcon icon={locationOutline}></IonIcon>
              {/* <IonSearchbar
                showClearButton="never"
                onClick={() => setInputActiveOpenModal("to")}
                value={addressTo}
                placeholder="PUC Campinas"
              /> */}
              <GooglePlacesAutocomplete
                apiKey={process.env.REACT_APP_KEY_API}
                apiOptions={{ language: "pt-br", region: "br" }}
                selectProps={{
                  value: addressTo,
                  onChange: setAddressTo,
                  className: "input-autocomplete",
                  placeholder: "PUC Campinas",
                }}
              />
            </div>
            <div className="button-search">
              <IonButton color="primary" onClick={() => buscarItinerarios()}>
                Buscar
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {recentSearches && recentSearches.length !== 0 ? (
          <>
            <IonItemDivider color="dark">Pesquisas recentes</IonItemDivider>
            <IonRow class="latest-searches">
              {recentSearches.map((search, index) => {
                return (
                  <>
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
                  </>
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
