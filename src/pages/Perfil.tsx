import {
  IonBackButton,
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
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useReducer, useContext } from "react";
import { callOutline, cardOutline, carOutline, createOutline, exitOutline, logoFacebook, logoWhatsapp, shieldCheckmarkOutline, starOutline } from "ionicons/icons";

import './Perfil.css'
import LocalStorage from "../LocalStorage";

import sessionsService from '../services/functions/sessionsService'
import usersService from '../services/functions/usersService'
import { UserContext } from "../App";

interface ScanNewProps {
  match:  {
    params: {
      id: string;
    }
  }
}

const Perfil: React.FC<ScanNewProps> = (props) => {
  const user = useContext(UserContext);

  const [isVisitor, setIsVisitor] = useState(true)

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const [inputValues, setInputValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      name: '',
      lastname: '',
      email: '',
      birth_date: '',
      bio: '',
    }
  );

  const [inputSocialInformationValues, setInputSocialInformationValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {
      phone: '',
      whatsapp: '',
      facebook: '',
      telegram: '',
    }
  );

  const history = useHistory();

  const redirectUserToLogin = () => {
    // TODO, não impede o usuário de retornar a página de login
    history.push({ pathname: '/login' });
    setMessageToast("Por favor, autentique-se!");
    setShowToast(true);
  }

  const logoff = () => {
    LocalStorage.clearToken()
    user.setIsLoggedIn(false);
    history.push({ pathname: '/login' });
  }

  useEffect(() => {
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
          setMessageToast('Usuário não existe!')
          setShowToast(true)
          history.push({ pathname: '/home' })
        } else {
          setMessageToast(getByIdRes.error.errorMessage)
          setShowToast(true)
        }
  
        return
      }
  
      if (getByIdRes.userData) {
        const userData = getByIdRes.userData
  
        if (isMounted) {
          setInputValues({
            'name': userData.name,
            'lastname': userData.lastname,
            'email': userData.email,
            'birth_date': userData.birth_date,
            'bio': userData.bio
          });

          if (!props.match.params.id) {
            setIsVisitor(false)
          }
        }
      }
      // get user social info
      const getUserSocialInfoRes = await usersService.getUserSocialInfo(userId)
  
      if (getUserSocialInfoRes.error) {
        if (isVisitor && props.match.params.id) {
          setMessageToast('Usuário não existe!')
          setShowToast(true)
          history.push({ pathname: '/home' })
        } else {
          setMessageToast(getUserSocialInfoRes.error.errorMessage)
          setShowToast(true)
        }
  
        return
      }
  
      if (getUserSocialInfoRes.data) {
        const userSocialData = getUserSocialInfoRes.data

        if (isMounted) {
          setInputSocialInformationValues({
            'phone': userSocialData.phone,
            'whatsapp': userSocialData.whatsapp,
            'facebook': userSocialData.facebook,
            'telegram': userSocialData.telegram,
          });
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
              {/* <img src="https://static.generated.photos/vue-static/home/feed/adult.png" alt="avatar" className='avatar' id='avatar'/> */}
              <img src="https://lastfm.freetls.fastly.net/i/u/avatar170s/faa68f71f3b2a48ca89228c2c2aa72d3" alt="avatar" className='avatar' id='avatar'/>
            <IonCardHeader>
              <IonCardTitle class="ion-text-center">{inputValues.name} {inputValues.lastname}</IonCardTitle>
            </IonCardHeader>

            <div id='profile-status'>
              <IonChip>
                {/* TODO, deve vir do backend */}
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
            { !inputSocialInformationValues.phone && !inputSocialInformationValues.whatsapp && !inputSocialInformationValues.facebook && !inputSocialInformationValues.telegram ?
                <>Sem informações de contato.</>
            : <>
                {
                  inputSocialInformationValues.phone ?
                  <>
                    <IonChip>
                      <IonIcon icon={callOutline} />
                      <IonLabel>{inputSocialInformationValues.phone}</IonLabel>
                    </IonChip>
                  </> : <></>
                }
    
                { inputSocialInformationValues.whatsapp ?
                  <>
                    <IonChip>
                      <IonIcon icon={logoWhatsapp} />
                      <IonLabel>{inputSocialInformationValues.whatsapp}</IonLabel>
                    </IonChip>
                  </> : <></>
                }
    
                { inputSocialInformationValues.facebook ?
                  <>
                    <IonChip>
                      <IonIcon icon={logoFacebook} />
                      <IonLabel>{inputSocialInformationValues.facebook}</IonLabel>
                    </IonChip>
                  </> : <></>
                }
    
                { inputSocialInformationValues.telegram ?
                  <>
                    <IonChip>
                      <IonIcon icon={callOutline} />
                      <IonLabel>{inputSocialInformationValues.telegram}</IonLabel>
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
              <IonItem button onClick={() => history.push({ pathname: '/perfil/completar', state: { userData: inputValues } })}>
                <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                <IonLabel>Completar cadastro</IonLabel>
              </IonItem>
              <IonItem button onClick={() => history.push({ pathname: '/cadastro-van'})}>
                <IonIcon icon={carOutline} slot="start" />
                <IonLabel>Cadastrar Van</IonLabel>
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
          color='danger'      
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
