import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
  IonToast,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../App";
import { Color } from "@ionic/core";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const Viagem: React.FC<ScanNewProps> = (props) => {
  const user = useContext(UserContext);

  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {});

  return (
    <IonPage>
      <PageHeader pageName="Viagem" backButtonPageUrl="/home"></PageHeader>

      <IonContent fullscreen>
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

export default Viagem;
