import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>("eve.holt@reqres.in");
    const [password, setPassword] = useState<string>("cityslicka");
    const [iserror, setIserror] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

  const { name } = useParams<{ name: string; }>();

  const handleLogin = () => {
    // validação de inputs
    if (!email) {
        setMessage("Por favor, informe um e-mail válido");
        setIserror(true);
        return;
    }

    if (validateEmail(email) === false) {
        setMessage("E-mail inválido");
        setIserror(true);
        return;
    }

    if (!password || password.length < 6) {
        setMessage("Por favor, digite a sua senha");
        setIserror(true);
        return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    const api = axios.create({
      baseURL: `https://reqres.in/api`,
    });

    api.post("/login", loginData)
      .then((res) => {
        // login bem-sucedido
        history.push("/dashboard/" + email);
      })
      .catch((error) => {
        setMessage("Falha na autenticação! Por favor, crie uma conta");
        setIserror(true);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonRow>
        <IonCol>
            <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
                />
            </IonCol>
        </IonRow>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRow>
            <IonCol>
                <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                    type="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    >
                </IonInput>
                </IonItem>
            </IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
                <p style={{ fontSize: "small" }}>
                Clicando no botão de "LOGIN", você concorda com a nossa <a href="#">política de termos e serviços</a>
                </p>
                <IonButton expand="block" onClick={handleLogin}>
                Login
                </IonButton>
                <p style={{ fontSize: "medium" }}>
                Ainda não possui uma conta? <a href="#">Cadastre-se aqui!</a>
                </p>
            </IonCol>
        </IonRow>

      </IonContent>
    </IonPage>
  );
};

export default Page;
