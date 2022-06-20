import {
IonBackButton,
IonButtons,
IonCard,
IonCardContent,
IonContent,
IonHeader,
IonIcon,
IonItem,
IonLabel,
IonPage,
IonTitle,
IonToolbar
} from "@ionic/react";
import React, { useEffect, useReducer } from "react";

import '../Perfil.css'
import { useHistory, useLocation } from "react-router";
import { callOutline, documentTextOutline } from "ionicons/icons";

import '../Cadastro/Cadastro.css'

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
  userData: userData
}

interface cardItem {
  icon: string;
  label: string;
  description: string;
  url: string;
  required: boolean;
}

let items: cardItem[] = [
  {
    icon: documentTextOutline,
    label: 'Documento',
    description: 'Cadastre seu documento para que seu perfil possa ser verificado',
    url: '/perfil/completar/documento',
    required: false
  },
  {
    icon: callOutline,
    label: 'Informações de contato',
    description: 'Cadastre seu número de telefone celular que para possam contatar você',
    url: '/perfil/completar/telefone',
    required: false
  }
]

const CadastroCompletar: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const handleCardClick = (item: cardItem) => {
    if (!item.required) return

    history.push({ pathname: item.url }); 
  }

  useEffect(() => {
    if (!location.state) {
      history.push({ pathname: '/perfil' })
    }

    if (!location.state.userData.document) items[0].required = true
    if (!location.state.userData.phone_number) items[1].required = true
  }, []);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completar cadastro</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/perfil" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        { items.map((item, index) => {
          return (
            <IonCard button={item.required} key={index} onClick={() => { handleCardClick(item) }}>
              <IonItem>
                <IonIcon icon={item.icon} slot="start" />
                <IonLabel>{item.label}</IonLabel>
              </IonItem>

              <IonCardContent>{item.description}</IonCardContent>
            </IonCard>
          )
        })}
      </IonContent>
    </IonPage>
  );
};

export default CadastroCompletar;
