import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSlide,
  IonSlides,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import {
  arrowForwardOutline,
  chevronBackOutline,
  closeOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { createUserSearch } from "../../services/api/users";
import { getTransportes } from "../../services/functions/transportsService";
import "./Transportes.css";

interface InfoBusca {
  addressFrom: any;
  addressTo: any;
  coordinatesFrom: any;
  coordinatesTo: any;
}

const Transportes: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const props = location.state as InfoBusca;
  const [transportes, setTransportes] = useState([]);
  const [showModalFilters, setShowModalFilters] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");
  const [toastColor, setToastColor] = useState("success");

  useEffect(() => {
    if (props) {
      buscaTransportes();
    }
  }, [props]);

  async function buscaTransportes() {
    let data = (await getTransportes(props)) as any;
    setTransportes(data);
  }

  function criaAlerta() {
    createUserSearch(
      props.coordinatesFrom.lat,
      props.coordinatesFrom.lng,
      props.addressTo.label
    )
      .then(() => {
        setMessageToast("Alerta criado com sucesso!");
        setShowToast(true);
      })
      .catch((err: any) => {
        setMessageToast("Não foi possível criar o alerta!");
        setToastColor("danger");
        setShowToast(true);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <div className="header-page">
          {/* <IonButtons slot="start">
            <IonBackButton text={'aaaa'} icon={arrowBack} defaultHref='buscar-transporte' />
          </IonButtons> */}
          <span className="span-info-back" onClick={history.goBack}>
            <IonIcon className="icon-return" icon={chevronBackOutline} />
            <div className="address-from-to">
              <span>{props.addressFrom.label}</span>
              <IonIcon icon={arrowForwardOutline} />
              <span>{props.addressTo.label}</span>
              <small>Hoje</small>
            </div>
          </span>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        {transportes && transportes.length > 0 ? (
          <div className="header-tabs">
            <IonSlides>
              <IonSlide>
                <h5>Mais barata</h5>
                <IonCard className="card-transporte">
                  <IonCardContent>Seu João</IonCardContent>
                </IonCard>
              </IonSlide>
              <IonSlide>
                <h5>Melhor avaliação</h5>
                <IonCard className="card-transporte">
                  <IonCardContent>Seu Zé</IonCardContent>
                </IonCard>
              </IonSlide>
            </IonSlides>
          </div>
        ) : (
          <h1 className="msg-not-found">
            Não foi encontrado nenhum transporte que atenda essa rota.
          </h1>
        )}
        {transportes &&
          transportes.map((record: any, index: any) => {
            return (
              <IonCard className="card-transporte" key={index}>
                <IonCardContent>
                  <h1>Motorista: {record.motorista}</h1>
                  <div>Avaliação: {record.avaliacao}</div>
                  <div>Valor: {record.valor}</div>
                  <div>Lugares disponíveis: {record.lugares}</div>
                </IonCardContent>
              </IonCard>
            );
          })}

        <div className="button-criar-alerta">
          <IonButton onClick={() => criaAlerta()}>Criar Alerta</IonButton>
        </div>

        <IonFab
          onClick={() => setShowModalFilters(true)}
          vertical="bottom"
          horizontal="center"
          slot="fixed"
        >
          <IonFabButton>Filtros</IonFabButton>
        </IonFab>
        <IonModal isOpen={showModalFilters}>
          <IonToolbar>
            <div className="header-filter-modal">
              <IonIcon
                size="large"
                icon={closeOutline}
                onClick={() => setShowModalFilters(false)}
              />
              <h4>
                <b>Limpar</b>
              </h4>
            </div>
          </IonToolbar>
          <IonContent>
            <div className="content-filter-modal">
              <h1>Filtrar</h1>
              <h3>Ordernar por</h3>
              <IonRadioGroup>
                <IonItem>
                  <IonLabel>Menor preço</IonLabel>
                  <IonRadio value="menor_preco" />
                </IonItem>

                <IonItem>
                  <IonLabel>Avaliação</IonLabel>
                  <IonRadio value="avaliacao" />
                </IonItem>

                <IonItem>
                  <IonLabel>Lugares disponíveis</IonLabel>
                  <IonRadio value="lugares_disponiveis" />
                </IonItem>
              </IonRadioGroup>
              <h3>Preferências</h3>
              <IonItem>
                <IonLabel>Vaga avulsa</IonLabel>
                <IonCheckbox value="vaga_avulsa" />
              </IonItem>
              <IonItem>
                <IonLabel>Ar condicionado</IonLabel>
                <IonCheckbox value="ar_condicionado" />
              </IonItem>
            </div>
          </IonContent>
          <IonFooter>
            <IonButton
              expand="block"
              onClick={() => setShowModalFilters(false)}
            >
              Aplicar Filtros
            </IonButton>
          </IonFooter>
        </IonModal>
        <IonToast
          // cssClass={"toast-notification"}
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Transportes;
