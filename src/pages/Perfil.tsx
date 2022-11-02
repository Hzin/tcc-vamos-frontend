import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonToast,
} from "@ionic/react";
import {
  buildOutline,
  callOutline,
  cardOutline,
  carOutline,
  createOutline,
  exitOutline,
  hammerOutline,
  mapOutline,
  personOutline,
  shieldCheckmarkOutline,
  starOutline,
} from "ionicons/icons";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import LocalStorage from "../LocalStorage";

import { Color } from "@ionic/core";
import { UserContext } from "../App";
import { PageHeader } from "../components/PageHeader";
import sessionsService from "../services/functions/sessionsService";
import * as usersService from "../services/functions/usersService";
import { closeToast } from "../services/utils";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };

  paramId?: string
}

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const Perfil: React.FC<ScanNewProps> = (props) => {
  const user = useContext(UserContext);

  const history = useHistory();
  const location = useLocation<LocationState>();

  const [pageName, setPageName] = useState('Carregando...');

  const [isVisitor, setIsVisitor] = useState(true);
  const [isDriver, setIsDriver] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [incompleteProfile, setIncompleteProfile] = useState(false);
  const [incompleteProfileCounter, setIncompleteProfileCounter] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      id: "",
      name: "",
      lastname: "",
      email: "",
      phone_number: "",
      birth_date: "",
      bio: "",
      document_type: "",
      document: "",
    }
  );

  const redirectUserToLogin = () => {
    history.push({ pathname: "/login" });
    setToastMessage("Por favor, autentique-se!");
    setShowToast(true);
  };

  const logoff = () => {
    LocalStorage.clearToken();
    user.setIsLoggedIn(false);
    history.push({ pathname: "/login" });
  };

  useEffect(() => {
    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor);
        setToastMessage(redirectData.toastMessage);
        setShowToast(true);
      }
    }

    const loadUserData = async () => {
      let userId = "";
      console.log(props)

      // verify if user is authenticated
      if (props.paramId) {
        userId = props.paramId
      } else if (props.match && props.match.params.id) {
        userId = props.match.params.id;
      } else {
        const refreshSessionRes = await sessionsService.refreshSession();

        if (refreshSessionRes.error) {
          redirectUserToLogin();
          return;
        }

        if (refreshSessionRes.userId) {
          userId = refreshSessionRes.userId;
        }
      }

      // get user info by ID
      const getByIdRes = await usersService.getById(userId);

      if (getByIdRes.error) {
        history.push({ pathname: "/login" });
      }

      // check if user is driver (if they have vans)
      const userIsDriverRes = await usersService.checkIfUserIsDriver(userId);

      // if (userIsDriverRes.error) {
      //   setToastColor('warning')
      //   setToastMessage(userIsDriverRes.error.errorMessage)
      //   setShowToast(true)
      //   return
      // }

      if (!userIsDriverRes.error && userIsDriverRes.result !== undefined) {
        setIsDriver(userIsDriverRes.result);
      }

      const userIsAdminRes = await usersService.checkIfUserIsAdmin();
      setIsAdmin(userIsAdminRes);

      if (getByIdRes.userData) {
        const userData = getByIdRes.userData;

        if (isMounted) {
          setInputValues({
            id: userId,
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            phone_number: userData.phone_number,
            birth_date: userData.birth_date,
            bio: userData.bio,
            document_type: userData.document_type,
            document: userData.document,
          });

          if (props.paramId || (props.match && props.match.params.id)) {
            setIsVisitor(true);
            setPageName(`Perfil de ${userData.name}`)

            return
          }

          setPageName('Meu perfil')

          if (!userData.document || !userData.phone_number) {
            setIncompleteProfile(true);

            let counter = 0;

            if (!userData.document) counter++;
            if (!userData.phone_number) counter++;

            setIncompleteProfileCounter(counter);
          }
        }
      }
    };

    let isMounted = true;

    const userToken = LocalStorage.getToken();

    if (!userToken) {
      redirectUserToLogin();
    }

    loadUserData()

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <IonPage>
      <PageHeader pageName={pageName} showBackButton></PageHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <img
              src="https://static.generated.photos/vue-static/home/feed/adult.png"
              alt="avatar"
              className="rounded w-28 h-28 block mx-auto"
            />
            {/* <img src="https://lastfm.freetls.fastly.net/i/u/avatar170s/faa68f71f3b2a48ca89228c2c2aa72d3" alt="avatar" className="rounded w-28 h-28 block mx-auto"/> */}
            <IonCardHeader>
              <IonCardTitle class="ion-text-center">
                {inputValues.name} {inputValues.lastname}
              </IonCardTitle>
            </IonCardHeader>

            <div className="text-center">
              {isDriver && (
                <>
                  <IonChip>
                    <IonIcon icon={carOutline}></IonIcon>
                    <IonLabel color="primary">Motorista</IonLabel>
                  </IonChip>
                </>
              )}

              <IonChip>
                <IonIcon icon={personOutline}></IonIcon>
                <IonLabel color="primary">Passageiro</IonLabel>
              </IonChip>

              {isAdmin && (
                <>
                  <IonChip>
                    <IonIcon icon={buildOutline}></IonIcon>
                    <IonLabel color="primary">Administrador</IonLabel>
                  </IonChip>
                </>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Biografia</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {inputValues.bio ? inputValues.bio : "Sem biografia."}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informações de contato</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {!inputValues.phone_number ? (
              <>Sem informações de contato.</>
            ) : (
              <>
                {inputValues.phone_number ? (
                  <>
                    <IonChip>
                      <IonIcon icon={callOutline} />
                      <IonLabel>{inputValues.phone_number}</IonLabel>
                    </IonChip>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </IonCardContent>
        </IonCard>

        {!isVisitor ? (
          <IonList>
            <IonListHeader class="text-lg">Configurações de perfil</IonListHeader>
            <IonItem
              button
              onClick={() =>
                history.push({
                  pathname: "/perfil/editar",
                  state: { userData: inputValues },
                })
              }
            >
              <IonIcon icon={createOutline} slot="start" />
              <IonLabel>Editar perfil</IonLabel>
            </IonItem>

            {incompleteProfile ? (
              <>
                <IonItem
                  button
                  onClick={() =>
                    history.push({
                      pathname: "/perfil/completar",
                      state: { userData: inputValues },
                    })
                  }
                >
                  <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                  <IonLabel>Completar cadastro</IonLabel>
                  <IonBadge color="primary">
                    {incompleteProfileCounter}
                  </IonBadge>
                </IonItem>
              </>
            ) : (
              <></>
            )}

            <IonListHeader class="text-lg mt-4">Configurações de veículo</IonListHeader>

            <IonItem
              button
              onClick={() => history.push({ pathname: "/veiculos/cadastrar" })}
            >
              <IonIcon icon={carOutline} slot="start" />
              <IonLabel>Cadastrar veículo</IonLabel>
            </IonItem>

            {isDriver && (
              <>
                <IonItem
                  button
                  onClick={() => history.push({ pathname: "/veiculos/meus" })}
                >
                  <IonIcon icon={carOutline} slot="start" />
                  <IonLabel>Meus veículos</IonLabel>
                </IonItem>

                <IonListHeader class="text-lg mt-4">Configurações de itinerário</IonListHeader>

                <IonItem
                  button
                  onClick={() =>
                    history.push({ pathname: "/cadastrar-itinerario" })
                  }
                >
                  <IonIcon icon={mapOutline} slot="start" />
                  <IonLabel>Cadastrar itinerário</IonLabel>
                </IonItem>
                <IonItem
                  button
                  onClick={() =>
                    history.push({ pathname: "/meus-itinerarios" })
                  }
                >
                  <IonIcon icon={mapOutline} slot="start" />
                  <IonLabel>Meus itinerários</IonLabel>
                </IonItem>
              </>
            )
            }

            {isDriver && (
              <>
                <IonListHeader class="text-lg mt-4">Configurações de motorista</IonListHeader>
                <IonItem>
                  <IonIcon icon={cardOutline} slot="start" />
                  <IonLabel>Pagamentos</IonLabel>
                </IonItem>
                <IonItem>
                  <IonIcon icon={starOutline} slot="start" />
                  <IonLabel>Avaliações</IonLabel>
                </IonItem>

                <IonItem
                  button
                  onClick={() => history.push({ pathname: "/buscar-passageiro" })}
                >
                  <IonIcon icon={personOutline} slot="start" />
                  <IonLabel>Buscar passageiros</IonLabel>
                </IonItem>
              </>
            )}

            {isAdmin && (
              <>

                <IonListHeader class="text-lg mt-4">Configurações de administrador</IonListHeader>
                <IonItem
                  button
                  onClick={() => history.push({ pathname: "/documentos/moderar" })}
                >
                  <IonIcon icon={hammerOutline} slot="start" />
                  <IonLabel>Moderar documentos de vans</IonLabel>
                </IonItem>
              </>
            )
            }

            <IonListHeader class="text-lg mt-4">Outros</IonListHeader>

            <IonItem button onClick={logoff}>
              <IonIcon icon={exitOutline} slot="start" />
              <IonLabel>Sair da conta</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          <></>
        )}

        <IonToast
          position="top"
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
