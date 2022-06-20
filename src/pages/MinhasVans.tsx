import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { Color } from '@ionic/react/node_modules/@ionic/core';
import { carOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { UserContext } from '../App';

import * as vansRoutes from '../services/api/vans';

import sessionsService from '../services/functions/sessionsService'

interface VanInfo {
  plate: string;
  brand: string;
  model: string;
  seats_number: string;
  document_status: boolean,
  locator_name: string;
  locator_address: string;
  locator_complement: string;
  locator_city: string;
  locator_state: string;
}

const MinhasVans: React.FC = () => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [userVans, setUserVans] = useState<VanInfo[]>();

  const redirectUserToLogin = () => {
    history.push({ pathname: '/login' });
  }

  useEffect(() => {
    const getUserVans = async () => {
      let userId = ''

      const refreshSessionRes = await sessionsService.refreshSession()
  
      if (refreshSessionRes.error) {
        redirectUserToLogin()
        return
      }
  
      if (refreshSessionRes.userId) {
        userId = refreshSessionRes.userId
      }

      vansRoutes.getByUserId(userId).then(response => {
        if (response.status === 'error') {
          setToastColor("danger")
          setToastMessage(response.message);
          setShowToast(true);
  
          return
        }
  
        setUserVans(response.data)
      }).catch((err) => {
        setToastColor("danger")
        setToastMessage(err);
        setShowToast(true);
      })
    }

    getUserVans()
  }, [])
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Minhas vans</IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/perfil" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      
        <IonContent>
          { userVans ? userVans.map((van, index) => {
            return (
              <IonCard key={index}>
              <IonCardHeader>
                <IonCardTitle>{van.plate}</IonCardTitle>
                <IonCardSubtitle>{van.brand} - {van.model}</IonCardSubtitle>
              </IonCardHeader>
                { van.locator_name ?
                  <>
                    <IonCardContent>{van.seats_number} assentos - Locador: {van.locator_name}</IonCardContent>
                  </> :
                  <>
                    <IonCardContent>{van.seats_number} assentos - Não é alugado</IonCardContent>
                  </>
                }
              </IonCard>
            )
          }) : <></>}

          <IonToast
            position="top"
            color={toastColor}
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage}
            duration={2500}
          />
        </IonContent>
    </IonPage>
  );
};

export default MinhasVans;