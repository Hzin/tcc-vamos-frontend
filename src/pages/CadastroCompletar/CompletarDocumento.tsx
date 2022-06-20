import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonInput,
} from "@ionic/react";

import { saveOutline } from "ionicons/icons";

import * as usersRoutes from '../../services/api/users';

import validateCpf from '../../services/validateCpf'

interface documentTypesInterface {
  label: string;
  name: string;
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
}
  
const CompletarDocumento: React.FC = () => {
  const location = useLocation<LocationState>();

  const [hasChangedSinceInitialState, setHasChangedSinceInitialState] = useState(false);

  const [documentTypes, setDocumentTypes] = useState<documentTypesInterface[]>([]);

  const [document, setDocument] = useState('');
  const [documentType, setDocumentType] = useState('');

  const [documentMaxLength, setDocumentMaxLength] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  
  const history = useHistory();

  const validateform = () => {
    if (isNaN((Number)(document))) {
      setMessageToast('Documento pode conter apenas números!')
      setShowToast(true)
      return false
    }

    if (documentType === 'cpf' && !validateCpf(document)) {
      setMessageToast('CPF inválido!')
      setShowToast(true)
      return false
    }

    return true
  }

  const handleUpdateUserDocuments = async () => {
    if (!validateform()) {
      return
    }

    usersRoutes.update({ document_type: documentType, document: document }).then(response => {
      if (response.status === 'error') {
        setMessageToast(response.message);
        setShowToast(true);

        return
      }

      history.push({ pathname: '/perfil', state: {
        redirectData: {
          showToastMessage: true,
          toastColor: "success",
          toastMessage: response.message,
        }
      }})
    }).catch((err) => {
      setMessageToast(err);
      setShowToast(true);
    })
  };

  const handleChangeDocumentType = (document_type: string) => {
    switch(document_type) {
      case 'cpf':
        setDocumentType('cpf') // workaround para o problema de setState para valores vindos de um evento sendo triggerado por um ion-select
        setDocumentMaxLength(11)
        break;
      case 'cnh':
        setDocumentType('cnh') // workaround para o problema de setState para valores vindos de um evento sendo triggerado por um ion-select
        setDocumentMaxLength(11)
        break;
      case 'rg':
        setDocumentType('rg') // workaround para o problema de setState para valores vindos de um evento sendo triggerado por um ion-select
        setDocumentMaxLength(9)
        break;
    }
  }

  useEffect(() => {
    if (!location.state.userData) {
      history.push({ pathname: '/perfil', state: {
        redirectData: {
          showToastMessage: true,
          toastColor: "warning",
          toastMessage: "Houve um erro. Por favor, tente novamente.",
        }, userData: location.state.userData
      }})      
    }

    setDocumentTypes([
      {
        name: 'cpf',
        label: 'CPF',
      },
      {
        name: 'rg',
        label: 'RG',
      },
      {
        name: 'cnh',
        label: 'CNH',
      },
    ])
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Completar cadastro</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/perfil/completar" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Completar cadastro</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList lines="full" class="ion-no-margin">
                <IonItem>
                  <IonLabel position="floating"> Tipo de documento</IonLabel>
                  <IonSelect id="document_type" onIonChange={(e: any) => { handleChangeDocumentType(e.detail.value) } }>
                    { documentTypes ? documentTypes.map((document, index) => {
                      return (<IonSelectOption key={index} value={document.name}>{document.label}</IonSelectOption>)
                    }) : <></> }
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating"> Documento</IonLabel>
                  <IonInput
                    type="text"
                    value={document}
                    maxlength={documentMaxLength}
                    onIonChange={(e: any) => { setDocument(e.target.value); setHasChangedSinceInitialState(true) }}
                  ></IonInput>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton disabled={!hasChangedSinceInitialState} onClick={handleUpdateUserDocuments}>
            <IonIcon icon={saveOutline} />
          </IonFabButton>
        </IonFab>

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

export default CompletarDocumento;
  