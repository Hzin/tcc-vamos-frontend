import { IonItem, IonLabel, IonInput, IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';
import { Action } from '../components/Action';

const Home: React.FC = () => {
  const history = useHistory()
  
  return (
    <IonPage>
        <IonContent>
            <IonButton onClick={() => { history.push({ pathname: '/perfil/1' }); }}>Ir para o perfil de outra pessoa</IonButton>
        </IonContent>
    </IonPage>
  );
};

export default Home;
