import { IonIcon, IonItem, IonLabel, IonInput, IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { arrowBack, logoFacebook, mail } from 'ionicons/icons';
// import CustomField from '../components/CustomField';
import { Action } from '../components/Action';
import { useEffect, useState } from 'react';
// import { validateForm } from '../data/utils';
import { useParams } from 'react-router';
import './Cadastro.css';
import ModalExample from '../components/Email';

const Cadastro: React.FC = () => {
  const [ errors, setErrors ] = useState(false);
  const createAccount = () => {

    // const errors = validateForm();
    setErrors(errors);

    // if (!errors.length) {

        //  Submit your form here
    // }
  }

  const { name } = useParams<{ name: string; }>();

  return (
    <IonPage>
			<IonHeader>
				<IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={''} icon={arrowBack} defaultHref='mainpages' />
          </IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
        <IonGrid className="ion-padding">
            <IonRow>
                <IonCol size="12">
                    <IonCardTitle>Como você deseja se cadastrar?</IonCardTitle>
                </IonCol>
            </IonRow>
            {/* <IonItem>
              <IonIcon icon={logoFacebook} />
              Continuar com Facebook
            </IonItem>
            <IonItem>
              <IonIcon icon={mail} />
              Continuar com e-mail
            </IonItem> */}
            <IonRow>
                <IonCol size="12">
                    <div id='nome-sobrenome'>
                      <IonItem>
                        <IonLabel position='floating'>Nome</IonLabel>
                        <IonInput clearInput></IonInput>
                      </IonItem>
                      <IonItem>
                        <IonLabel position='floating'>Sobrenome</IonLabel>
                        <IonInput clearInput></IonInput>
                      </IonItem>
                    </div>
                    
                    <IonItem>
                      <IonLabel position='floating'>E-mail</IonLabel>
                      <IonInput clearInput type='email'></IonInput>
                    </IonItem>

                    <IonItem>
                      <IonLabel position='stacked'>Data de nascimento</IonLabel>
                      <IonInput type='date'></IonInput>
                    </IonItem>
                    
                    <IonItem>
                      <IonLabel position='floating'>Senha</IonLabel>
                      <IonInput clearInput type='password'></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position='floating'>Confirme a senha</IonLabel>
                      <IonInput clearInput type='password'></IonInput>
                    </IonItem>
                    
                    <IonButton className="ion-margin-top" expand="block" onClick={ createAccount }>Cadastrar-se</IonButton>
                </IonCol>
            </IonRow>
            <small className='ion-margin-top'>
              Ao se cadastrar, você aceita nossos <a href="">Termos e Condições</a> e nossa <a href=""> Política de Privacidade</a>.
            </small>
            <Action message="Já tem conta?" text="Login" link="/login" />
        </IonGrid>
			</IonContent>
		</IonPage>
  );
};

export default Cadastro;
