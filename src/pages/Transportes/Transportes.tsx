import { IonContent, IonPage, IonFab, IonFabButton, IonIcon, IonCard, IonInput, IonRow, IonCol, IonCardContent, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import { arrowBack, arrowBackOutline, arrowForwardOutline, chevronBackOutline, chevronForwardOutline, locateOutline, locationOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import './Transportes.css';

const Transportes: React.FC = () => {
	const history = useHistory();

  return (
    <IonPage>
			<IonHeader>
				<div className='header-page'>
          {/* <IonButtons slot="start">
            <IonBackButton text={'aaaa'} icon={arrowBack} defaultHref='buscar-transporte' />
          </IonButtons> */}
					<span className='span-info-back' onClick={history.goBack}>
						<IonIcon className='icon-return' icon={chevronBackOutline}/>
						<div>
							Vila Réggio 
							<IonIcon icon={arrowForwardOutline}/>
							PUC-Campinas
						</div>
					</span>
				</div>
			</IonHeader>
			<IonContent fullscreen>
				
				<IonFab vertical="bottom" horizontal="center" slot="fixed">
					<IonFabButton>
						Filtros
					</IonFabButton>
				</IonFab>
			</IonContent>
		</IonPage>
  );
};

export default Transportes;