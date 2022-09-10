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
  IonRange,
  IonSelect,
  IonSelectOption,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  addCircleOutline,
  arrowBack,
  arrowForward,
  checkmark,
  close,
  informationCircle,
  locateOutline,
  locationOutline,
  removeCircleOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import AutoCompleteInput from "../../components/AutoCompleteInput";
import * as vansRoutes from "../../services/api/vans";
import sessionsService from "../../services/functions/sessionsService";

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

interface Coords {
  lat: number;
  lng: number;
}

interface Address {
  formatted_address: string;
  lat: number;
  lng: number;
}

export default function CadastrarItinerario() {
  const minDate = new Date();

  const history = useHistory();

  const mySlides = useRef<any>(null);
  const nextButton1 = useRef<HTMLIonButtonElement>(null);
  const nextButton2 = useRef<HTMLIonButtonElement>(null);

  const [specificDate, setSpecificDate] = useState<boolean>(false);
  const [singleVacancy, setSingleVacancy] = useState<boolean>(false);
  const [vans, setVans] = useState<VanInfo[]>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState<Color>("primary");
  //Infos
  const [initialAddress, setInitialAddress] = useState<Address>();
  const [initialCoords, setInitialCoords] = useState<Coords>();
  const [neighborhoods, setNeighborhoods] = useState<Array<string>>([]);
  const [finalAddress, setFinalAddress] = useState<string>("");
  const [destinations, setDestinations] = useState<Array<string>>([]);
  const [daysOfWeek, setDaysOfWeek] = useState<number>();
  const [specificDay, setSpecificDay] = useState<Date>();
  const [departureTime, setDepartureTime] = useState<Date>();
  const [arrivalTime, setArrivalTime] = useState<Date>();
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
  const [dailyPrice, setDailyPrice] = useState<number>(0);
  const [van, setVan] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const redirectUserToLogin = () => {
    history.push({ pathname: "/login" });
  };

  const onBtnClicked = async (direction: string) => {
    const swiper = await mySlides.current.getSwiper();
    if (direction === "next") {
      swiper.slideNext();
    } else if (direction === "prev") {
      swiper.slidePrev();
    }
  };

  function formatRange(rangeValue: number) {
    switch (rangeValue) {
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sabádo";
      case 7:
        return "Domingo";

      default:
        return "";
    }
  }

  useEffect(() => {
    const getUserVans = async () => {
      let userId = "";

      const refreshSessionRes = await sessionsService.refreshSession();

      if (refreshSessionRes.error) {
        redirectUserToLogin();
        return;
      }

      if (refreshSessionRes.userId) {
        userId = refreshSessionRes.userId;
      }

      vansRoutes
        .getByUserId(userId)
        .then((response) => {
          if (response.status === "error") {
            setToastColor("danger");
            setToastMessage(response.message);
            setShowToast(true);

            return;
          }

          setVans(response.data);
        })
        .catch((err) => {
          setToastColor("danger");
          setToastMessage(err);
          setShowToast(true);
        });
    };

    getUserVans();
  }, []);

  useEffect(() => {
    if (initialAddress) {
      nextButton1.current!.disabled = false;
    } else {
      nextButton1.current!.disabled = true;
    }
  }, [initialAddress]);

  function addNeighborhoodToList() {}

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
                {/* <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_KEY_API}
                  apiOptions={{ language: "pt-br", region: "br" }}
                  selectProps={{
                    className: "input-autocomplete",
                    placeholder: "PUC Campinas",
                    onChange: () => {
                      addNeighborhoodToList();
                    },
                  }}
                /> */}
              </div>
              <div className="flex justify-end mb-3">
                <IonButton>
                  <IonIcon icon={add} />
                </IonButton>
              </div>
              <div className="mb-3">
                <IonList>
                  <IonItem>
                    <IonCheckbox slot="end"></IonCheckbox>
                    <IonLabel>Taquaral</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonCheckbox slot="end"></IonCheckbox>
                    <IonLabel>Barão Geraldo</IonLabel>
                  </IonItem>
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
                {/* <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_KEY_API}
                  apiOptions={{ language: "pt-br", region: "br" }}
                  selectProps={{
                    className: "input-autocomplete",
                    placeholder: "PUC Campinas",
                    onChange: () => {
                      nextButton2.current!.disabled = false;
                    },
                  }}
                /> */}
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton
                  ref={nextButton2}
                  // disabled
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
                {/* <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_KEY_API}
                  apiOptions={{ language: "pt-br", region: "br" }}
                  selectProps={{
                    className: "input-autocomplete",
                    placeholder: "PUC Campinas",
                  }}
                /> */}
              </div>
              <div className="flex justify-end mb-3">
                <IonButton>
                  <IonIcon icon={add} />
                </IonButton>
              </div>
              <div className="mb-3">
                <IonList>
                  <IonItem>
                    <IonCheckbox slot="end"></IonCheckbox>
                    <IonLabel>Unicamp</IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonCheckbox slot="end"></IonCheckbox>
                    <IonLabel>CPFL</IonLabel>
                  </IonItem>
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
              <div hidden={specificDate} className="flex items-center mb-3">
                <IonRange
                  dualKnobs
                  pin
                  pinFormatter={(value: number) => formatRange(value)}
                  ticks
                  snaps
                  min={1}
                  max={7}
                >
                  <IonLabel slot="start">Seg</IonLabel>
                  <IonLabel slot="end">Dom</IonLabel>
                </IonRange>
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
                <IonDatetime presentation="time"></IonDatetime>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton
                  ref={nextButton2}
                  // disabled
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
                <IonDatetime presentation="time"></IonDatetime>
              </div>
              <div className="flex justify-between mb-3">
                <IonButton onClick={() => onBtnClicked("prev")} color="primary">
                  <IonIcon icon={arrowBack} />
                </IonButton>
                <IonButton
                  ref={nextButton2}
                  // disabled
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
                <h1 className="text-xl">R$ {monthlyPrice}</h1>
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
                    <h1 className="text-xl">R$ {dailyPrice}</h1>
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
                <IonButton
                  ref={nextButton2}
                  // disabled
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
                  ref={nextButton2}
                  // disabled
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
                <IonButton
                  ref={nextButton2}
                  // disabled
                  onClick={() => onBtnClicked("next")}
                  color="primary"
                >
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
