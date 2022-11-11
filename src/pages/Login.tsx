import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { IonGrid, IonRow, IonCol, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

import * as sessionRoutes from "../services/api/session";
import LocalStorage from "../LocalStorage";
import { Action } from "../components/Action";
import { UserContext } from "../App";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

const Page: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const singinForm = {
      login: email,
      password: password,
    };

    await sessionRoutes
      .create(singinForm)
      .then((response) => {
        if (response.status === "error") {
          setMessageToast(response.message);
          setShowToast(true);

          return;
        }

        const token = response.token;

        LocalStorage.setToken(token);

        user.setIsLoggedIn(true);

        history.push({
          pathname: "/home",
          state: {
            redirectData: {
              showToastMessage: true,
              toastColor: "success",
              toastMessage: "Usuário autenticado com sucesso!",
            },
          },
        });
      })
      .catch((error) => {
        // if (!error.response) return

        // se o backend retornou uma mensagem de erro customizada
        // if (error.response.data.message) {
        console.dir("Houve um erro: ", { error });
        // alert("Houve um erro");
      });
  };

  return (
    <IonPage>
      <PageHeader pageName="Login"></PageHeader>

      <IonContent fullscreen>
        <IonGrid>
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
              <IonButton expand="block" onClick={handleLogin}>
                Login
              </IonButton>
              <p style={{ fontSize: "medium" }}>
                <Action
                  message="Ainda não possui uma conta?"
                  text="Cadastre-se aqui!"
                  link="/cadastro"
                />
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          position="top"
          color="danger"
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Page;
