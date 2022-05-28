import {
IonBackButton,
IonButton,
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
import React, { useEffect, useReducer, useState } from "react";

import './Perfil.css'
import { useHistory, useLocation } from "react-router";
import { bookOutline, callOutline, documentTextOutline, homeOutline, logoWhatsapp } from "ionicons/icons";

import isEqual from 'lodash.isequal';

import * as usersRoutes from '../services/api/users';

import './Cadastro/Cadastro.css'

interface userData {
  name: string;
  lastname: string;
  email: string;
  birth_date: string;
  bio: string;
}

interface LocationState {
  userData: userData
}

const items = [
  // TODO, CPF e CNH
  {
    icon: documentTextOutline,
    label: 'Documentos',
    description: 'Cadastre seus documentos para que seu perfil possa ser verificado.'
  },
  // TODO, telefone e WhatsApp
  {
    icon: callOutline,
    label: 'Informações de contato',
    description: 'Cadastre seu número de telefone celular que para possam contatar você.'
  },
  {
    icon: homeOutline,
    label: 'Endereço de residência',
    description: 'Diga-nos seu endereço para que possa começar a solicitar vagas.'
  },
  {
    icon: bookOutline,
    label: 'Instituição de ensino',
    description: 'Diga-nos sua IES para que possa começar a solicitar vagas.'
  },
]

const PerfilCompletar: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');

  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    birth_date: '',
    bio: '',
  });

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

  useEffect(() => {
    let userData = location.state.userData

    setUserData(location.state.userData)
    setInputValues({
      'name': userData.name,
      'lastname': userData.lastname,
      'email': userData.email,
      'birth_date': userData.birth_date,
      'bio': userData.bio
    });
  }, [userData]);

  const handleUpdateUserData = () => {
    usersRoutes.update(inputValues).then(response => {
      if (response.status === 'error') {
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      console.log(response)
    }).catch((err) => {
      setMessageToast(err);
      setShowToast(true);
    })
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completar perfil</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/perfil" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        { items.map((item, index) => {
          return (
            <IonCard button key={index}>
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

export default PerfilCompletar;
