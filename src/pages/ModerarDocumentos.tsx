import {
  IonContent,
  IonPage,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";

import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

const ModerarDocumentos: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  return (
    <IonPage>
      <PageHeader
        pageName="Moderar documentos"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent fullscreen>
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

export default ModerarDocumentos;
