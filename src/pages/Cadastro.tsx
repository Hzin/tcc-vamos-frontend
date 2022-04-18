import { IonProgressBar, IonItem, IonLabel, IonInput, IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { arrowBack, logoFacebook, mail } from 'ionicons/icons';
import { Action } from '../components/Action';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './Cadastro.css';
import ModalExample from '../components/Email';
import * as UsersService from '../services/users'

const Cadastro: React.FC = () => {
  const history = useHistory();
  
  const [ errors, setErrors ] = useState(false);

  const [email, setEmail] = useState({});
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');

  const handleSubmit = async () => {
    // setDisableSubmitButton(true)
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);

    const signUpForm = {
      name: firstName +' '+ lastName,
      email: email,
      birth_date: birthDate,
      password: password
    }

    console.log(signUpForm);

    await UsersService.create(signUpForm).catch(error => {
      if (!error.response) return

      if (error.response.data.message) {
        // setAlertContent(error.response.data.message);
      } else {
        // setAlertContent('Houve um erro ao realizar o cadastro.');
      }
      
      // setAlertSeverity('error');
      // setAlert(true);
      // setDisableSubmitButton(false)
    }).then(response => {
      if (!response) return;
  
      history.push(
        {
          pathname: '/home',
          state: {
            detail: 'signedUp',
            alertSeverity: 'success',
            alertContent: 'Usuário cadastrado com sucesso!'
          }
        }
      )
    });
  };

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
                      <IonInput 
                        type='text'
                        clearInput
                        onIonInput={(e: any) => setFirstName(e.target.value)}
                      >
                      </IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position='floating'>Sobrenome</IonLabel>
                      <IonInput 
                        clearInput
                        onIonInput={(e: any) => setLastName(e.target.value)}
                      >
                      </IonInput>
                    </IonItem>
                  </div>
                  
                  <IonItem>
                    <IonLabel position='floating'>E-mail</IonLabel>
                    <IonInput 
                      clearInput 
                      type='email'
                      onIonInput={(e: any) => setEmail(e.target.value)}
                    >
                    </IonInput>
                  </IonItem>

                  <IonItem>
                    <IonLabel position='stacked'>Data de nascimento</IonLabel>
                    <IonInput 
                      type='date'
                      onIonInput={(e: any) => setBirthDate(e.target.value)}
                    >
                    </IonInput>
                  </IonItem>
                  
                  <IonItem>
                    <IonLabel position='floating'>Senha</IonLabel>
                    <IonInput 
                      clearInput 
                      type='password'
                      onIonInput={(e: any) => setPassword(e.target.value)}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position='floating'>Confirme a senha</IonLabel>
                    <IonInput 
                      clearInput 
                      type='password'
                      onIonInput={(e: any) => setConfirmPassword(e.target.value)}
                    ></IonInput>
                  </IonItem>
                  
                  <IonButton className="ion-margin-top" expand="block" onClick={ handleSubmit }>Cadastrar-se</IonButton>
                </IonCol>
            </IonRow>
            <small className='ion-margin-top'>
              Ao se cadastrar, você aceita nossos <a href="">Termos e Condições</a> e nossa <a href=""> Política de Privacidade</a>.
            </small>
            <Action message="Já tem conta?" text="Login" link="/login" />
        </IonGrid>
        {/* <IonProgressBar type="indeterminate"></IonProgressBar><br /> */}
			</IonContent>
		</IonPage>
  );
};

export default Cadastro;