import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
} from "@ionic/react";

import * as sessionRoutes from '../../services/session';
import LocalStorage from "../../LocalStorage";

const Page: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("matheusalb3213@gmail.com");
  const [password, setPassword] = useState<string>("123456");
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  function validateEmail(email: string) {
    const re =
      /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    if (!email) {
      setMessage("Por favor, informe um e-mail válido");
      setIsError(true);
      return false;
    }

    if (validateEmail(email) === false) {
      setMessage("E-mail inválido");
      setIsError(true);
      return false;
    }

    if (!password) {
      setMessage("Por favor, digite a sua senha");
      setIsError(true);
      return false;
    }

    if(password.length < 6) {
      setMessage("A senha deve conter ao menos 6 dígitos");
      setIsError(true);
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
        setMessage(response.message);
        setIsError(true);

        return
      }

      const { token } = response.token

      LocalStorage.setToken(token);

      history.push({ pathname: '/home' });
    }).catch(error => {
      // if (!error.response) return

      // se o backend retornou uma mensagem de erro customizada
      // if (error.response.data.message) {

      console.dir('Houve um erro: ', {error})
      alert('Houve um erro')
    })
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonRow>
        <IonCol>
          <IonIcon
            style={{ fontSize: "70px", color: "#0040ff" }}
            icon={personCircle}
          />
        </IonCol>
      </IonRow>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonAlert
                isOpen={isError}
                onDidDismiss={() => setIsError(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
              />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Senha</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <p style={{ fontSize: "small" }}>
                Clicando no botão de "LOGIN", você concorda com a nossa{" "}
                <a href="#">política de termos e serviços</a>
              </p>
              <IonButton expand="block" onClick={handleLogin}>
                Login
              </IonButton>
              <p style={{ fontSize: "medium" }}>
                Ainda não possui uma conta? <a href="#">Cadastre-se aqui!</a>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Page;
