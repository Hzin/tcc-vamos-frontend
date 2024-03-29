import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { IonGrid, IonRow, IonCol, IonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

import { UserContext } from "../App";
import { PageHeader } from "../components/PageHeader";

const Debug: React.FC = () => {
  const [input, setInput] = useState("");

  return (
    <IonPage>
      <PageHeader pageName="Debug" backButtonPageUrl="/home"></PageHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Debug</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Input</IonLabel>
                <IonInput
                  type="date"
                  value={input}
                  // onIonChange={(e) => { setInput(e.detail.value!) }}
                ></IonInput>
              </IonItem>

              <IonButton
                onClick={(e) => {
                  setInput("1994-12-15");
                  console.log(input);
                }}
              >
                Enviar
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Debug;
