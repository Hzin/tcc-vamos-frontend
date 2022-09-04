import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  arrowForwardOutline,
  cashOutline,
  chevronForwardOutline,
  locateOutline,
  locationOutline,
  personOutline,
  starOutline,
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
import { Itinerary } from "../models/itinerary.model";
import { PageHeader } from "../components/PageHeader";
import { closeToast } from "../services/utils";

import { Color } from "@ionic/core";

const BuscarItinerario: React.FC = () => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [addressFrom, setAddressFrom] = useState<any>("");
  const [coordinatesFrom, setCoordinatesFrom] = useState<any>("");
  const [addressTo, setAddressTo] = useState<any>("");
  const [coordinatesTo, setCoordinatesTo] = useState<any>("");
  const [showModalEnd, setShowModalEnd] = useState(false);
  const [addressResults, setAddressResults] = useState<any[]>([]);
  const [inputActive, setInputActive] = useState("");

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

  useEffect(() => {
    if (addressFrom.label && addressFrom.label.length > 0) {
      geocodeByAddress(addressFrom.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => setCoordinatesFrom({ lat, lng }));
    }
  }, [addressFrom]);

  useEffect(() => {
    if (addressTo.label && addressTo.label.length > 0) {
      geocodeByAddress(addressTo.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => setCoordinatesTo({ lat, lng }));
    }
  }, [addressTo]);

  async function buscarItinerarios() {
    if (!coordinatesFrom || !coordinatesTo || !addressFrom || !addressTo) {
      return;
    }

    const maxRecentSearchesLength = 0

    if (recentSearches.length >= maxRecentSearchesLength) {
      setRecentSearches(recentSearches.slice(recentSearches.length - maxRecentSearchesLength));
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
      .searchItineraries({
        coordinatesFrom,
        coordinatesTo,
      })
      .then((response) => {
        // if (response.status === "error") {
        //   setToastColor("danger");
        //   setMessageToast(response.message);
        //   setShowToast(true);

        //   return;
        // }

        setItinerariesList(response);
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
        {/* <IonRow class="latest-searches">
          <IonIcon
            className="icon-align-vcenter"
            size="large"
            icon={timeOutline}
          />
          <div className="div_from_to">
            <span>Taquaral</span>
            <IonIcon icon={arrowForwardOutline}></IonIcon>
            <span>PUC-Campinas</span>
            <br />
            <small>Há 2 hora</small>
          </div>
          <IonIcon
            className="icon-forward icon-align-vcenter"
            size="large"
            icon={chevronForwardOutline}
          />
        </IonRow> */}
        {/* <IonModal isOpen={showModalEnd}>
          <IonContent>
            <div className="header-search-modal">
              <IonIcon
                className="icon-return-modal"
                icon={arrowBack}
                onClick={() => setShowModalEnd(false)}
              />
              <IonInput
                onIonChange={(e) => optionsAddress(e.detail.value)}
                placeholder="R. José Paulino, 1234 - Centro, Campinas - SP, 13013-001"
                className="search-modal"
              />
            </div>
            {addressResults.length > 0 ? (
              addressResults.map((item: any) => {
                return (
                  <div
                    key={item.value}
                    className="modal-search-results"
                    data-value={item.value}
                    data-label={item.label}
                    onClick={(e) => setAddress(e)}
                  >
                    {item.label}
                    <IonIcon
                      className="icon-results-modal"
                      icon={chevronForwardOutline}
                    />
                  </div>
                );
              })
            ) : (
              <>
                <IonProgressBar type="indeterminate" />
                <br />
              </>
            )}
          </IonContent>
        </IonModal> */}

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
