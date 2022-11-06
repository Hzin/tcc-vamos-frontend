import { Color } from "@ionic/core";
import {
  IonButton,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToast,
} from "@ionic/react";
import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Action } from "../components/Action";
import { PageHeader } from "../components/PageHeader";
import { useAuth } from "../contexts/auth";
import LocalStorage from "../LocalStorage";
import * as UsersService from "../services/api/users";
import { closeToast } from "../services/utils";

const Cadastro: React.FC = () => {
  const history = useHistory();

  const { signIn } = useAuth();

  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [lResult, setlResult] = useState({
    error: "",
    success: true,
  });

  const emailValidate = () => {
    var usuario = email.substring(0, email.indexOf("@"));
    var dominio = email.substring(email.indexOf("@") + 1, email.length);

    if (
      usuario.length >= 1 &&
      dominio.length >= 3 &&
      usuario.search("@") === -1 &&
      dominio.search("@") === -1 &&
      usuario.search(" ") === -1 &&
      dominio.search(" ") === -1 &&
      dominio.search(".") !== -1 &&
      dominio.indexOf(".") >= 1 &&
      dominio.lastIndexOf(".") < dominio.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const clearResult = () => {
    lResult.error = "";
    lResult.success = true;
  };

  const fieldValidate = async () => {
    clearResult();

    if (!emailValidate()) {
      lResult.error = "E-mail inválido!";
      lResult.success = false;
      return lResult;
    } else if (password.length < 7 || password.length > 12) {
      //TODO: validar de acordo com a documentação
      lResult.error = "A senha deve ter de 7 a 12 caracteres!";
      lResult.success = false;
      return lResult;
    }

    return lResult;
  };

  const handleSubmit = async () => {
    if (
      name === "" ||
      email === "" ||
      birthDate === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setToastColor("warning");
      setMessageToast("Nenhum campo pode estar vazio!");
      setShowToast(true);
      return;
    }

    if (password !== confirmPassword) {
      setToastColor("warning");
      setMessageToast("As senhas devem ser iguais!");
      setShowToast(true);
      return;
    }

    const signUpForm = {
      name: firstName,
      lastname: lastName,
      email: email,
      birth_date: birthDate,
      password: password,
    };

    let result = fieldValidate();
    if (!(await result).success) {
      setToastColor("warning");
      setMessageToast(lResult.error);
      setShowToast(true);
      return;
    }

    let retorno = await UsersService.create(signUpForm);

    if (!retorno.token) {
      setToastColor("danger");
      setMessageToast(retorno.message);
      setShowToast(true);
      return;
    }

    // signIn(email, password);

    history.push({
      pathname: "/login",
      state: {
        redirectData: {
          showToastMessage: true,
          toastColor: "success",
          toastMessage: "Usuário cadastrado com sucesso!",
        },
      },
    });
  };

  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <PageHeader pageName="Cadastro" backButtonPageUrl="/login"></PageHeader>

      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12">
              {/* <IonCardTitle>Como você deseja se cadastrar?</IonCardTitle> */}
              <IonCardTitle>Cadastro</IonCardTitle>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <div className="flex">
                <IonItem>
                  <IonLabel position="floating">Nome</IonLabel>
                  <IonInput
                    type="text"
                    clearInput
                    onIonInput={(e: any) => setFirstName(e.target.value)}
                    // error={isError}
                    // onIonChange={(e: any) => setFirstName(e.detail.value)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Sobrenome</IonLabel>
                  <IonInput
                    clearInput
                    onIonChange={(e: any) => setLastName(e.target.value)}
                  ></IonInput>
                </IonItem>
              </div>

              <IonItem>
                <IonLabel position="floating">E-mail</IonLabel>
                <IonInput
                  clearInput
                  type="email"
                  onIonChange={(e: any) => setEmail(e.target.value)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Data de nascimento</IonLabel>
                <IonInput
                  type="date"
                  onIonChange={(e: any) => setBirthDate(e.target.value)}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Senha</IonLabel>
                <IonInput
                  clearInput
                  type="password"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Confirme a senha</IonLabel>
                <IonInput
                  clearInput
                  type="password"
                  onIonChange={(e: any) => setConfirmPassword(e.target.value)}
                ></IonInput>
              </IonItem>

              <IonButton
                className="ion-margin-top"
                expand="block"
                onClick={handleSubmit}
              >
                Cadastrar-se
              </IonButton>
            </IonCol>
          </IonRow>
          <small className="ion-margin-top">
            Ao se cadastrar, você aceita nossos{" "}
            <a href="">Termos e Condições</a> e nossa{" "}
            <a href=""> Política de Privacidade</a>.
          </small>
          <Action message="Já tem conta?" text="Login" link="/login" />
        </IonGrid>
        {/* <IonProgressBar type="indeterminate"></IonProgressBar><br /> */}

        <IonToast
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
