import { IonItem, IonLabel, IonInput, IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Action } from '../components/Action';

const Home: React.FC = () => {
  return (
    <IonPage>
        <IonContent fullscreen>
            <IonGrid className="ion-padding">
                <IonRow>
                    <IonCol size="12">
                        <IonCardTitle>Como você deseja se cadastrar?</IonCardTitle>
                    </IonCol>
                </IonRow>
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
                        
                        <IonButton className="ion-margin-top" expand="block">Cadastrar-se</IonButton>
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

export default Home;
