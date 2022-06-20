import {
  IonContent,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonInput,
  IonRow,
  IonCol,
  IonCardContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonBadge,
  IonRouterOutlet,
  IonSlides,
  IonSlide,
  IonModal,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonItem,
  IonRadio,
  IonCheckbox,
  IonFooter,
} from "@ionic/react";
import {
  arrowBack,
  arrowBackOutline,
  arrowForwardOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  locateOutline,
  locationOutline,
  timeOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getTransportes } from "../../services/transportes";
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

  useEffect(() => {
    if (props) {
      buscaTransportes();
    }
  }, [props]);

  async function buscaTransportes() {
    let data = (await getTransportes(props)) as any;
    setTransportes(data);
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
      </IonContent>
    </IonPage>
  );
};

export default Transportes;
