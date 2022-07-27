import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect, useReducer, useContext } from "react";
import { callOutline, cardOutline, carOutline, createOutline, exitOutline, logoFacebook, logoWhatsapp, personOutline, shieldCheckmarkOutline, starOutline } from "ionicons/icons";

import './Perfil.css'
import LocalStorage from "../LocalStorage";

import sessionsService from '../services/functions/sessionsService'
import usersService from '../services/functions/usersService'
import { UserContext } from "../App";
import { Color } from "@ionic/react/node_modules/@ionic/core";

interface ScanNewProps {
  match:  {
    params: {
      id: string;
    }
  }
}

interface LocationState { 
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  }
}

const Perfil: React.FC<ScanNewProps> = (props) => {
  const user = useContext(UserContext);

  const history = useHistory();
  const location = useLocation<LocationState>();

  const [isVisitor, setIsVisitor] = useState(true)
  const [isDriver, setIsDriver] = useState(false)

  const [incompleteProfile, setIncompleteProfile] = useState(false)
  const [incompleteProfileCounter, setIncompleteProfileCounter] = useState(0)

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      id: '',
      name: '',
      lastname: '',
      email: '',
      phone_number: '',
      birth_date: '',
      bio: '',
      document_type: '',
      document: '',
    }
  );

  const redirectUserToLogin = () => {
    history.push({ pathname: '/login' });
    setToastMessage("Por favor, autentique-se!");
    setShowToast(true);
  }

  const logoff = () => {
    LocalStorage.clearToken()
    user.setIsLoggedIn(false);
    history.push({ pathname: '/login' });
  }

  useEffect(() => {
    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor)
        setToastMessage(redirectData.toastMessage)
        setShowToast(true)
      }
    }

    const loadUserData = async () => {
      let userId = ''

      // verify if user is authenticated
      if (props.match.params.id) {
        userId = props.match.params.id
      } else {
        const refreshSessionRes = await sessionsService.refreshSession()
  
        if (refreshSessionRes.error) {
          redirectUserToLogin()
          return
        }
    
        if (refreshSessionRes.userId) {
          userId = refreshSessionRes.userId
        }
      }
      
      // get user info by ID
      const getByIdRes = await usersService.getById(userId)
  
      if (getByIdRes.error) {
        if (isVisitor && props.match.params.id) {
          setToastMessage('Usuário não existe!')
          setShowToast(true)
          history.push({ pathname: '/home' })
        } else {
          setToastMessage(getByIdRes.error.errorMessage)
          setShowToast(true)
        }
  
        return
      }

      // check if user is driver (if they have vans)
      const userIsDriverRes = await usersService.checkIfUserIsDriver(userId)
  
      // if (userIsDriverRes.error) {
      //   setToastColor('warning')
      //   setToastMessage(userIsDriverRes.error.errorMessage)
      //   setShowToast(true)
      //   return
      // }

      if (!userIsDriverRes.error && userIsDriverRes.result !== undefined) {
        setIsDriver(userIsDriverRes.result)
      }
  
      if (getByIdRes.userData) {
        const userData = getByIdRes.userData
  
        if (isMounted) {
          setInputValues({
            'id': userId,
            'name': userData.name,
            'lastname': userData.lastname,
            'email': userData.email,
            'phone_number': userData.phone_number,
            'birth_date': userData.birth_date,
            'bio': userData.bio,
            'document_type': userData.document_type,
            'document': userData.document
          });

          if (!props.match.params.id) {
            setIsVisitor(false)
          }
          
          if (!userData.document || !userData.phone_number) {
            setIncompleteProfile(true)

            let counter = 0

            if (!userData.document) counter++
            if (!userData.phone_number) counter++

            setIncompleteProfileCounter(counter)
          }
        }
      }
    }

    let isMounted = true;
    
    const userToken = LocalStorage.getToken()

    if (!userToken) {
      redirectUserToLogin()
    }
    
    loadUserData()

    return () => { isMounted = false };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seu perfil</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Seu perfil</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonCard>
          <IonCardContent>
              <img src="https://static.generated.photos/vue-static/home/feed/adult.png" alt="avatar" className='avatar' id='avatar'/>
              {/* <img src="https://lastfm.freetls.fastly.net/i/u/avatar170s/faa68f71f3b2a48ca89228c2c2aa72d3" alt="avatar" className='avatar' id='avatar'/> */}
            <IonCardHeader>
              <IonCardTitle class="ion-text-center">{inputValues.name} {inputValues.lastname}</IonCardTitle>
            </IonCardHeader>

            <div id='profile-status'>
              { isDriver ?
                <>
                  <IonChip>
                    <IonIcon icon={carOutline}></IonIcon>
                    <IonLabel color="primary">Motorista</IonLabel>
                  </IonChip>
                </> : <></>
              }
              <IonChip>
                <IonIcon icon={personOutline}></IonIcon>
                <IonLabel color="primary">Passageiro</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Biografia</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {inputValues.bio ? inputValues.bio : 'Sem biografia.' }
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Informações de contato</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            { !inputValues.phone_number ?
                <>Sem informações de contato.</>
            : <>
                {
                  inputValues.phone_number ?
                  <>
                    <IonChip>
                      <IonIcon icon={callOutline} />
                      <IonLabel>{inputValues.phone_number}</IonLabel>
                    </IonChip>
                  </> : <></>
                }
              </>
            }
          </IonCardContent>
        </IonCard>

        { !isVisitor ?
          <IonList>
            <IonListHeader>Configurações</IonListHeader>
              <IonItem button onClick={() => history.push({ pathname: '/perfil/editar', state: { userData: inputValues } })}>
                <IonIcon icon={createOutline} slot="start" />
                <IonLabel>Editar perfil</IonLabel>
              </IonItem>

              { incompleteProfile ?
                <>
                  <IonItem button onClick={() => history.push({ pathname: '/perfil/completar', state: { userData: inputValues } })}>
                    <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                    <IonLabel>Completar cadastro</IonLabel>
                    <IonBadge color="primary">{incompleteProfileCounter}</IonBadge>
                  </IonItem>
                </>
                : <></> }

              <IonItem button onClick={() => history.push({ pathname: '/cadastro-van'})}>
                <IonIcon icon={carOutline} slot="start" />
                <IonLabel>Cadastrar Van</IonLabel>
              </IonItem>
              <IonItem button onClick={() => history.push({ pathname: '/minhas-vans'})}>
                <IonIcon icon={carOutline} slot="start" />
                <IonLabel>Minhas Vans</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={cardOutline} slot="start" />
                <IonLabel>Pagamentos</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={starOutline} slot="start" />
                <IonLabel>Avaliações</IonLabel>
              </IonItem>
              <IonItem button onClick={logoff}>
                <IonIcon icon={exitOutline} slot="start" />
                <IonLabel>Sair da conta</IonLabel>
              </IonItem>
          </IonList> : <></>
        }

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
};

export default Perfil;
