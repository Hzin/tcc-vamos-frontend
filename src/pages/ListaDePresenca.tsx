
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { IonGrid, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
} from "@ionic/react";

import * as sessionRoutes from '../services/api/session';
import LocalStorage from '../LocalStorage';
import { UserContext } from "../App";
import { checkmarkOutline, closeOutline } from "ionicons/icons";

const Contratos: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useContext(UserContext);

  function validateEmail(email: string) {
    const re =
      // eslint-disable-next-line no-control-regex
      /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    if (!email) {
      setMessageToast("Por favor, informe o e-mail");
      setShowToast(true);
      return false;
    }

    if (!validateEmail(email)) {
      setMessageToast("E-mail inválido");
      setShowToast(true);
      return false;
    }

    if (!password) {
      setMessageToast("Por favor, digite a sua senha");
      setShowToast(true);
      return false;
    }

    if (password.length < 7 || password.length > 12) {
      setMessageToast("A senha deve conter entre 7 e 12 dígitos");
      setShowToast(true);
      return false;
    }

    return true;
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    const singinForm = {
      login: email,
      password: password,
    };

    await sessionRoutes.create(singinForm).then(response => {
      if (response.status === 'error') {
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      const { token } = response.token

      LocalStorage.setToken(token);

      user.setIsLoggedIn(true);

      history.push({
        pathname: '/home', state: {
          redirectData: {
            showToastMessage: true,
            toastColor: "success",
            toastMessage: "Usuário autenticado com sucesso!",
          }
        }
      })
    }).catch(error => {
      // if (!error.response) return

      // se o backend retornou uma mensagem de erro customizada
      // if (error.response.data.message) {
      console.dir('Houve um erro: ', { error })
      alert('Houve um erro')
    })
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de presença</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vinculo-van-editar" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Minhas Vans</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonGrid>
          <IonCardTitle>25/09/2022  16:50</IonCardTitle>
          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Carlos Augusto</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={closeOutline} slot="start" />
              <IonLabel>Daniela Candido</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Danielle Rosa</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Dara Silva</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={closeOutline} slot="start" />
              <IonLabel>Eric Santos</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Elena Vanda</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Fabio Fernando</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={closeOutline} slot="start" />
              <IonLabel>Vera Silva</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>
            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Bruna Paz</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Beatriz Santos</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Guilherme Santoro</IonLabel>
            </IonItem>
          </IonCard>

          <IonCard>

            <IonItem>
              <IonIcon icon={checkmarkOutline} slot="start" />
              <IonLabel>Fernando Faria</IonLabel>
            </IonItem>
          </IonCard>
        </IonGrid>

        <IonToast
          position="top"
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

export default Contratos;