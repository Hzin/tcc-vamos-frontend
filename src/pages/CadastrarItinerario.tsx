import { Color } from "@ionic/core";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  addCircleOutline,
  arrowBack,
  arrowForward,
  checkmark,
  close,
  informationCircle,
  locateOutline,
  locationOutline,
  removeCircleOutline,
  trash,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import AutoCompleteInput from "../components/AutoCompleteInput";
import { CreateItineraryRequest } from "../services/api/itineraries";
import * as vehiclesRoutes from "../services/api/vehicles";
import { createItinerary } from "../services/functions/itinerariesService";
import sessionsService from "../services/functions/sessionsService";

const slideOpts = {
  initialSlide: 0,
  allowTouchMove: false,
};

interface VanInfo {
  plate: string;
  brand: string;
  model: string;
  seats_number: string;
  document_status: boolean;
  locator_name: string;
  locator_address: string;
  locator_complement: string;
  locator_city: string;
  locator_state: string;
}

interface Address {
  formatted_address: string;
  lat: number;
  lng: number;
}

interface Destinations extends Address {
  is_final?: boolean;
}

export default function CadastrarItinerario() {
  const minDate = new Date();

  const history = useHistory();

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const mySlides = useRef<any>(null);
  const nextButton1 = useRef<HTMLIonButtonElement>(null);
  const nextButton2 = useRef<HTMLIonButtonElement>(null);
  const nextButton3 = useRef<HTMLIonButtonElement>(null);
  const nextButton4 = useRef<HTMLIonButtonElement>(null);

  const [specificDate, setSpecificDate] = useState<boolean>(false);
  const [singleVacancy, setSingleVacancy] = useState<boolean>(false);
  const [vans, setVans] = useState<VanInfo[]>();

  //Infos
  const [initialAddress, setInitialAddress] = useState<Address>();
  const [neighborhoods, setNeighborhoods] = useState<Address[]>([]);
  const [finalAddress, setFinalAddress] = useState<Address>();
  const [destinations, setDestinations] = useState<Destinations[]>([]);
  const [daysOfWeek, setDaysOfWeek] = useState<string>("0000000");
  const [specificDay, setSpecificDay] = useState<string>();
  const [departureTime, setDepartureTime] = useState<string>("00:00");
  const [arrivalTime, setArrivalTime] = useState<string>("00:00");
  const [monthlyPrice, setMonthlyPrice] = useState<number>(100);
  const [dailyPrice, setDailyPrice] = useState<number>(40);
  const [van, setVan] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  //Estados para limpar o valor dos campos após selecionar uma opção
  const [valueControl1, setValueControl1] = useState<string>("");
  const [valueControl2, setValueControl2] = useState<string>("");

  const onBtnClicked = async (direction: string) => {
    const swiper = await mySlides.current.getSwiper();
    if (direction === "next") {
      swiper.slideNext();
    } else if (direction === "prev") {
      swiper.slidePrev();
    }
  };

  useEffect(() => {
    const getUserVans = async () => {
      let userId = "";

      const refreshSessionRes = await sessionsService.refreshSession();

      if (refreshSessionRes.error) {
        history.push({ pathname: "/login" });
        return;
      }

      if (refreshSessionRes.userId) {
        userId = refreshSessionRes.userId;
      }

      await vehiclesRoutes
        .getByUserId(userId)
        .then((response: any) => {
          if (response.status === "error") {
            setToastColor("danger");
            setToastMessage(response.message);
            setShowToast(true);

            return;
          }
          setVans(response);
        })
        .catch((err: any) => {
          setToastColor("danger");
          setToastMessage(err);
          setShowToast(true);
        });
    };

    nextButton2.current!.disabled = true;
    getUserVans();
  }, []);

  useEffect(() => {
    if (initialAddress) {
      nextButton1.current!.disabled = false;
    } else {
      nextButton1.current!.disabled = true;
    }
  }, [initialAddress]);

  useEffect(() => {
    if (finalAddress) {
      nextButton3.current!.disabled = false;
    } else {
      nextButton3.current!.disabled = true;
    }
  }, [finalAddress]);

  useEffect(() => {
    if (van) {
      nextButton4.current!.disabled = false;
    } else {
      nextButton4.current!.disabled = true;
    }
  }, [van]);

  function addNeighborhood(address: Address) {
    setNeighborhoods((arr) => [...arr, address]);
    nextButton2.current!.disabled = false;
    setValueControl1("");
  }

  function removeNeighborhood(index: number) {
    const newNeighborhoods = [...neighborhoods];
    newNeighborhoods.splice(index, 1);
    setNeighborhoods(newNeighborhoods);
    if (newNeighborhoods.length === 0) {
      nextButton2.current!.disabled = true;
    } else {
      nextButton2.current!.disabled = false;
    }
  }

  function addDestination(address: Address) {
    setDestinations((arr) => [...arr, address]);
    setValueControl2("");
  }

  function removeDestionation(index: number) {
    const newDestionations = [...destinations];
    newDestionations.splice(index, 1);
    setDestinations(newDestionations);
  }

  function setDayOfWeekSeleted(day: string, checked: boolean) {
    switch (day) {
      case "Domingo":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[0] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[0] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
      case "Segunda":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[1] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[1] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
      case "Terça":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[2] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[2] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
      case "Quarta":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[3] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[3] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
      case "Quinta":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[4] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[4] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
      case "Sexta":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[5] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[5] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
      case "Sábado":
        setDaysOfWeek((value) => {
          if (checked) {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[6] = "1";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          } else {
            let newDaysOfWeek = value.split("");
            newDaysOfWeek[6] = "0";
            let finalString = newDaysOfWeek.join("");
            return finalString;
          }
        });
        break;
    }
  }

  async function cadastrar() {
    let newDestinations: Destinations[] = [{...finalAddress!, is_final: true}]; 
    newDestinations = newDestinations.concat(destinations);

    let itinerary: CreateItineraryRequest = {
      vehicle_plate: van,
      days_of_week: daysOfWeek,
      specific_day: specificDate ? specificDay : undefined,
      estimated_departure_time_going: departureTime,
      estimated_arrival_time_going: arrivalTime,
      monthly_price: monthlyPrice,
      daily_price: dailyPrice,
      accept_daily: singleVacancy,
      itinerary_nickname: nickname,
      estimated_departure_address: initialAddress!.formatted_address,
      departure_latitude: initialAddress!.lat,
      departure_longitude: initialAddress!.lng,
      neighborhoods_served: neighborhoods,
      destinations: newDestinations,
    };

    await createItinerary(itinerary)
      .then((response: any) => {
        if (response.status === "error") {
          setToastColor("danger");
          setToastMessage(response.message);
          setShowToast(true);
        }

        history.push({
          pathname: "/meus-itinerarios",
          state: {
            redirectData: {
              showToastMessage: true,
              toastColor: "success",
              toastMessage: "Itinerário cadastrado com sucesso!",
            },
          },
        });
      })
      .catch((err: any) => {
        setToastColor("danger");
        setToastMessage(err);
        setShowToast(true);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastrar Itinerário</IonTitle>
          <IonButtons slot="start">
            <IonBackButton icon={close} text="" defaultHref="/perfil" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSlides ref={mySlides} options={slideOpts}>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Digite o endereço de onde você iniciará a rota do itinerário
              </h1>
              <div className="flex items-center mb-3">
                <IonIcon icon={locateOutline}></IonIcon>
                <AutoCompleteInput
                  placeholder="R. José Paulino, 1234"
                  className="ml-2"
                  onAddressSelected={(address: Address) =>
                    setInitialAddress(address)
                  }
                  onChange={(e: any) => {
                    nextButton1.current!.disabled = true;
                  }}
                />
              </div>
              <div className="flex justify-end mb-3">
                <IonButton
                  ref={nextButton1}
                  onClick={() => onBtnClicked("next")}
                  color="primary"
                >
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Essa informação é importante para que possamos informar aos
                  passageiros um horário aproximado que você passará para
                  pegá-lo.
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Adicione os bairros que você atenderá
              </h1>
              <div className="flex items-center mb-3">
                <IonIcon icon={locationOutline}></IonIcon>
                <AutoCompleteInput
                  placeholder="R. José Paulino, 1234"
                  className="ml-2"
                  value={valueControl1}
                  onAddressSelected={(address: Address) =>
                    addNeighborhood(address)
                  }
                  onChange={(e: any) => {
                    setValueControl1(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <IonList class="w-screen">
                  {neighborhoods.map((neighborhood, index) => (
                    <IonItem key={index}>
                      <IonButton
                        slot="end"
                        color={"light"}
                        onClick={() => removeNeighborhood(index)}
                      >
                        <IonIcon icon={trash} />
                      </IonButton>
                      <IonLabel>{neighborhood.formatted_address}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton
                  ref={nextButton2}
                  onClick={() => onBtnClicked("next")}
                  color="primary"
                >
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Não se preocupe, você poderá adicionar ou remover bairros
                  posteriormente caso precise editando o itinerário.
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Digite o endereço de destino final do itinerário
              </h1>
              <div className="flex items-center mb-3">
                <IonIcon icon={locationOutline}></IonIcon>
                <AutoCompleteInput
                  placeholder="R. José Paulino, 1234"
                  className="ml-2"
                  onAddressSelected={(address: Address) =>
                    setFinalAddress(address)
                  }
                />
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton
                  ref={nextButton3}
                  disabled
                  onClick={() => onBtnClicked("next")}
                  color="primary"
                >
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Não se preocupe, você poderá adicionar paradas.
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Adicione paradas durante o trajeto do itinerário para encontrar
                mais passageiros
              </h1>
              <div className="flex items-center mb-3">
                <IonIcon icon={locationOutline}></IonIcon>
                <AutoCompleteInput
                  placeholder="R. José Paulino, 1234"
                  className="ml-2"
                  value={valueControl2}
                  onAddressSelected={(address: Address) =>
                    addDestination(address)
                  }
                  onChange={(e: any) => {
                    setValueControl2(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <IonList class="w-screen">
                  {destinations.map((destination, index) => (
                    <IonItem key={index}>
                      <IonButton
                        slot="end"
                        color={"light"}
                        onClick={() => removeDestionation(index)}
                      >
                        <IonIcon icon={trash} />
                      </IonButton>
                      <IonLabel>{destination.formatted_address}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton onClick={() => onBtnClicked("next")} color="primary">
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Não se preocupe, você poderá adicionar ou remover paradas
                  posteriormente caso precise editando o itinerário.
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Escolha o(s) dia(s) da semana ou um dia específico que o
                itinerário será realizado
              </h1>
              <div hidden={specificDate} className="mb-3">
                <div className="grid grid-cols-7 gap-4">
                  <div>
                    <IonLabel>D</IonLabel>
                  </div>
                  <div>
                    <IonLabel>S</IonLabel>
                  </div>
                  <div>
                    <IonLabel>T</IonLabel>
                  </div>
                  <div>
                    <IonLabel>Q</IonLabel>
                  </div>
                  <div>
                    <IonLabel>Q</IonLabel>
                  </div>
                  <div>
                    <IonLabel>S</IonLabel>
                  </div>
                  <div>
                    <IonLabel>S</IonLabel>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-4">
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Domingo", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Segunda", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Terça", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Quarta", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Quinta", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Sexta", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                  <div>
                    <IonCheckbox
                      onIonChange={(e) =>
                        setDayOfWeekSeleted("Sábado", e.target.checked)
                      }
                    ></IonCheckbox>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <IonItem className="mb-3">
                  <IonLabel>Dia Específico ?</IonLabel>
                  <IonCheckbox
                    onIonChange={(event) =>
                      event.detail.checked
                        ? setSpecificDate(true)
                        : setSpecificDate(false)
                    }
                  ></IonCheckbox>
                </IonItem>
                <IonDatetime
                  min={minDate.toISOString()}
                  presentation="date"
                  hidden={!specificDate}
                  value={specificDay}
                  onIonChange={(e) =>
                    setSpecificDay(
                      typeof e.detail.value === "string" ? e.detail.value : ""
                    )
                  }
                ></IonDatetime>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton onClick={() => onBtnClicked("next")} color="primary">
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Qual o horário estimado de ínicio do itinerário ?
              </h1>
              <div className="mb-3">
                <IonDatetime
                  presentation="time"
                  value={departureTime}
                  onIonChange={(event) =>
                    setDepartureTime(
                      typeof event.detail.value === "string"
                        ? event.detail.value
                        : "00:00"
                    )
                  }
                ></IonDatetime>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton onClick={() => onBtnClicked("next")} color="primary">
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Não se preocupe, é apenas um horário estimado.
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Qual o horário estimado de chegado no último destino do
                itinerário ?
              </h1>
              <div className="mb-3">
                <IonDatetime
                  presentation="time"
                  value={arrivalTime}
                  onIonChange={(event) =>
                    setArrivalTime(
                      typeof event.detail.value === "string"
                        ? event.detail.value
                        : "00:00"
                    )
                  }
                ></IonDatetime>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton onClick={() => onBtnClicked("next")} color="primary">
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Não se preocupe, é apenas um horário estimado.
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Preencha as informações de pagamento
              </h1>
              <IonLabel>Valor cobrado mensalmente</IonLabel>
              <div className="flex justify-between items-center mb-3">
                <IonIcon
                  size="large"
                  onClick={() => setMonthlyPrice(monthlyPrice - 1)}
                  icon={removeCircleOutline}
                />
                <IonInput
                  type="number"
                  className="text-2xl"
                  value={monthlyPrice}
                />
                <IonIcon
                  className="text-4xl"
                  size="large"
                  onClick={() => setMonthlyPrice(monthlyPrice + 1)}
                  icon={addCircleOutline}
                />
              </div>
              <div className="mb-3">
                <IonItem className="mb-3">
                  <IonLabel>Aceitar pedidos para vagas avulsa ?</IonLabel>
                  <IonCheckbox
                    onIonChange={(event) =>
                      setSingleVacancy(event.detail.checked)
                    }
                  ></IonCheckbox>
                </IonItem>
                <div hidden={!singleVacancy}>
                  <IonLabel>Valor cobrado por dia (vaga avulsa)</IonLabel>
                  <div className="flex justify-between items-center">
                    <IonIcon
                      size="large"
                      onClick={() => setDailyPrice(dailyPrice - 1)}
                      icon={removeCircleOutline}
                    />
                    <IonInput
                      type="number"
                      className="text-2xl"
                      value={dailyPrice}
                    />
                    <IonIcon
                      className="text-4xl"
                      size="large"
                      onClick={() => setDailyPrice(dailyPrice + 1)}
                      icon={addCircleOutline}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton onClick={() => onBtnClicked("next")} color="primary">
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
              <div className="flex items-center">
                <IonIcon
                  icon={informationCircle}
                  size="large"
                  className="mr-4"
                />
                <small className="text-gray-500">
                  Lembre-se esse valor será cobrado independente do destino do
                  passageiro.
                  <br />
                  <b>
                    Em breve será possível cobrar valores diferentes para cada
                    destino.
                  </b>
                </small>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Escolha o veículo que será utilizado no itinerário
              </h1>
              <div className="mb-3">
                <IonSelect
                  interface="action-sheet"
                  placeholder="Selecione o veículo"
                  onIonChange={(event) => setVan(event.detail.value)}
                  className="w-screen"
                >
                  {vans ? (
                    vans.map((van, index) => {
                      return (
                        <IonSelectOption key={index} value={van.plate}>
                          {van.brand +
                            " - " +
                            van.model +
                            " | Placa: " +
                            van.plate}
                        </IonSelectOption>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </IonSelect>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton
                  ref={nextButton4}
                  disabled
                  onClick={() => onBtnClicked("next")}
                  color="primary"
                >
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </div>
            </div>
          </IonSlide>
          <IonSlide>
            <div className="m-3">
              <h1 className="mb-3 text-xl">
                Escolha um apelido para o itinerário
              </h1>
              <div className="mb-3">
                <IonInput
                  value={nickname}
                  onIonChange={(event) => setNickname(event.detail.value!)}
                  placeholder="Manhã - Centro"
                ></IonInput>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton onClick={() => cadastrar()} color="primary">
                  <IonIcon icon={checkmark} />
                  Cadastrar
                </IonButton>
              </div>
            </div>
          </IonSlide>
        </IonSlides>
        <IonToast
          position="top"
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
}
