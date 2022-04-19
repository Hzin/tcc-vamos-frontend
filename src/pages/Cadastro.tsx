import { IonToast, IonProgressBar, IonItem, IonLabel, IonInput, IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { arrowBack, logoFacebook, mail } from 'ionicons/icons';
import { Action } from '../components/Action';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './Cadastro.css';
import ModalExample from '../components/Email';
import * as UsersService from '../services/users'

const Cadastro: React.FC = () => {
  const history = useHistory();
  
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast ] = useState('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [lResult, setlResult] = useState({
    error: '',
    success: true
  });

  const emailValidate = () => {
    var usuario = email.substring(0, email.indexOf("@"));
    var dominio = email.substring(email.indexOf("@") + 1, email.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) 
    {
        return true;
    } else {
        return false;
    }
  };

  const clearResult = () => {
      lResult.error = '';
      lResult.success = true;
  }

  const fieldValidate = async () => {
      clearResult();

      if(!emailValidate()) {
          lResult.error = 'O EMAIL é inválido!';
          lResult.success = false;
          return lResult;
      } else if(password.length < 7 || password.length > 12) { //TODO: validar de acordo com a documentação
          lResult.error = 'A senha deve ter de 7 a 12 caracteres!';
          lResult.success = false;
          return lResult;
      }
      
      return lResult;
  };

  const handleSubmit = async () => {

    if(name != '' && email != '' && birthDate != '' && password != '' && confirmPassword != '') {
      if(password === confirmPassword){
        const signUpForm = {
          name: firstName +' '+ lastName,
          email: email,
          birth_date: birthDate,
          password: password
        }

        let result = fieldValidate();
        if((await result).success) {

            let retorno = await UsersService.create(signUpForm);
            console.log(retorno);
            if(retorno.token) {
                // let signIn = await Api.signIn(email, passwordField); 
                // if(signIn.token) {
                    // await AsyncStorage.setItem('token', signIn.token);
                    // await AsyncStorage.setItem('cpf', retorno.cpf);
                    history.push('home');

            } else {
              setMessageToast(retorno.message);
              setShowToast(true);
            }
        } else{
          setMessageToast(lResult.error);
          setShowToast(true);
        }
      } else {
        setMessageToast('As senhas devem ser iguais!');
        setShowToast(true);
      }
    } else {
      setMessageToast('Nenhum campo pode ser nulo!');
      setShowToast(true);
    }
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
                    {/* <IonCardTitle>Como você deseja se cadastrar?</IonCardTitle> */}
                    <IonCardTitle>Cadastro</IonCardTitle>
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
        <IonToast
          // cssClass={"toast-notification"}
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

export default Cadastro;