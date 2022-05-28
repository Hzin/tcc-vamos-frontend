import { IonItem, IonLabel, IonInput, IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { useHistory } from 'react-router';
import { Action } from '../components/Action';

const Home: React.FC = () => {
  const history = useHistory()
  
  return (
    <IonPage>
        <IonContent>
            <IonButton onClick={() => { history.push({ pathname: '/usuario/56520ae7-faf8-4444-a82b-7f3990ab02d8' }); }}>Ir para o perfil de outra pessoa</IonButton>
        </IonContent>
    </IonPage>
  );
};

export default Home;
