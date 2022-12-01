import {
  IonContent,
  IonPage,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonToast } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

import { Action } from "../components/Action";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";
import { useAuth } from "../contexts/auth";
import { Color } from "@ionic/core";

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const Page: React.FC = () => {
  const location = useLocation<LocationState>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {signed, signIn} =  useAuth();

  useEffect(() => {
    if (signed) {
      history.push("/home");
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor);
        setToastMessage(redirectData.toastMessage);
        setShowToast(true);
      }
    }
  }, [location.state]);

  function validateEmail(email: string) {
    const re =
      // eslint-disable-next-line no-control-regex
      /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
  }

  const validateForm = () => {
    if (!email) {
      setToastMessage("Por favor, informe o e-mail");
      setToastColor("danger");
      setShowToast(true);
      return false;
    }

    if (!validateEmail(email)) {
      setToastMessage("E-mail inválido");
      setToastColor("danger");
      setShowToast(true);
      return false;
    }

    if (!password) {
      setToastMessage("Por favor, digite a sua senha");
      setToastColor("danger");
      setShowToast(true);
      return false;
    }

    if (password.length < 7 || password.length > 12) {
      setToastMessage("A senha deve conter entre 7 e 12 dígitos");
      setToastColor("danger");
      setShowToast(true);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    signIn(email, password).then(() => {
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

export default Page;
