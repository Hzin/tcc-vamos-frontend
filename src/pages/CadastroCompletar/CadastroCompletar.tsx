import {
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import { callOutline, documentTextOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import "../Perfil.css";

import { Color } from "@ionic/core";
import { PageHeader } from "../../components/PageHeader";
import { closeToast } from "../../services/utils";

interface cardItem {
  icon: string;
  label: string;
  description: string;
  url: string;
  required: boolean;
}

interface userData {
  name: string;
  lastname: string;
  email: string;
  phone_number: string;
  birth_date: string;
  bio: string;
  document_type: string;
  document: string;
}

interface LocationState {
  userData: userData;

  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

let items: cardItem[] = [
  {
    icon: documentTextOutline,
    label: "Documento",
    description:
      "Cadastre seu documento para que seu perfil possa ser verificado",
    url: "/perfil/completar/documento",
    required: false,
  },
  {
    icon: callOutline,
    label: "Informações de contato",
    description:
      "Cadastre seu número de telefone celular que para possam contatar você",
    url: "/perfil/completar/telefone",
    required: false,
  },
];

const CadastroCompletar: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const handleCardClick = (item: cardItem) => {
    if (!item.required) return;

    history.push({
      pathname: item.url,
      state: { userData: location.state.userData },
    });
  };

  useEffect(() => {
    if (!location.state || !location.state.userData) {
      history.push({ pathname: "/perfil" });
    }

    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor);
        setToastMessage(redirectData.toastMessage);
        setShowToast(true);
      }
    }

    if (!location.state.userData.document) items[0].required = true;
    if (!location.state.userData.phone_number) items[1].required = true;
  }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Completar cadastro"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent>
        {items.map((item, index) => {
          return (
            <IonCard
              button={item.required}
              key={index}
              onClick={() => {
                handleCardClick(item);
              }}
            >
              <IonItem>
                <IonIcon icon={item.icon} slot="start" />
                <IonLabel>{item.label}</IonLabel>
              </IonItem>

              <IonCardContent>{item.description}</IonCardContent>
            </IonCard>
          );
        })}

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

export default CadastroCompletar;
