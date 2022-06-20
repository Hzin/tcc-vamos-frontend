import {
  IonContent,
  IonPage,
  IonIcon,
  IonCard,
  IonInput,
  IonRow,
  IonCardContent,
  IonButton,
  IonSearchbar,
  IonModal,
  IonProgressBar,
} from "@ionic/react";
import {
  arrowBack,
  arrowForwardOutline,
  chevronForwardOutline,
  locateOutline,
  locationOutline,
  timeOutline,
} from "ionicons/icons";
import "./BuscarTransporte.css";

import { useEffect, useState } from "react";
import { autoCompleteAddress } from "../../services/utils";
import { useHistory } from "react-router";

const BuscarTransporte: React.FC = () => {
	const history = useHistory();
  const [addressFrom, setAddressFrom] = useState<any>("");
  const [coordinatesFrom, setCoordinatesFrom] = useState<any>("")
  const [addressTo, setAddressTo] = useState<any>("");
	const [coordinatesTo, setCoordinatesTo] = useState<any>("")
  const [showModalEnd, setShowModalEnd] = useState(false);
  const [addressResults, setAddressResults] = useState<any>([]);
	const [inputActive, setInputActive] = useState("");

  const optionsAddress = async (inputValue: any) => {
    let results = await autoCompleteAddress(inputValue)
      .then((res) => {
        return res.map((item: any) => {
          return {
            value:
              item.geometry.coordinates[0] + "," + item.geometry.coordinates[1],
            label: item.properties.formatted,
          };
        });
      })
      .catch((err) => {
        console.log("Erro ao buscar endereço:", err);
      });
    setAddressResults(results);
  };

  function setInputActiveOpenModal(input: string) {
    setInputActive(input);
    setShowModalEnd(true);
  }

  function setAddress(div: any) {
    if (inputActive === "from") {
			setAddressFrom(div.target.attributes[2].value);
			setCoordinatesFrom(div.target.attributes[1].value);
		}else{
			setAddressTo(div.target.attributes[2].value)
    	setCoordinatesTo(div.target.attributes[1].value)
		}
		setShowModalEnd(false)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <div className="inputs-from-to">
              <IonIcon icon={locateOutline}></IonIcon>
              <IonSearchbar
                showClearButton="never"
                onClick={() => setInputActiveOpenModal("from")}
                value={addressFrom}
                placeholder="R. José Paulino, 1234 - Centro, Campinas - SP, 13013-001"
              />
            </div>
            <div className="inputs-from-to">
              <IonIcon icon={locationOutline}></IonIcon>
              <IonSearchbar
                showClearButton="never"
                onClick={() => setInputActiveOpenModal("to")}
                value={addressTo}
                placeholder="PUC Campinas"
              />
            </div>
            <div className="button-search">
              <IonButton color="primary" onClick={() => history.push("/transportes")}>Buscar</IonButton>
            </div>
          </IonCardContent>
        </IonCard>
        <IonRow class="latest-searches">
          <IonIcon
            className="icon-align-vcenter"
            size="large"
            icon={timeOutline}
          ></IonIcon>
          <div className="div_from_to">
            <span>Rua Tal Tal, 154, São Paulo - SP</span>
            <IonIcon icon={arrowForwardOutline}></IonIcon>
            <span>USP</span>
            <br />
            <small>Há 1 hora</small>
          </div>
          <IonIcon
            className="icon-forward icon-align-vcenter"
            size="large"
            icon={chevronForwardOutline}
          ></IonIcon>
        </IonRow>
        <IonRow class="latest-searches">
          <IonIcon
            className="icon-align-vcenter"
            size="large"
            icon={timeOutline}
          />
          <div className="div_from_to">
            <span>Taquaral</span>
            <IonIcon icon={arrowForwardOutline}></IonIcon>
            <span>PUC-Campinas</span>
            <br />
            <small>Há 2 hora</small>
          </div>
          <IonIcon
            className="icon-forward icon-align-vcenter"
            size="large"
            icon={chevronForwardOutline}
          />
        </IonRow>
        <IonModal isOpen={showModalEnd}>
          <IonContent>
            <div className="header-search-modal">
              <IonIcon
                className="icon-return-modal"
                icon={arrowBack}
                onClick={() => setShowModalEnd(false)}
              />
              <IonInput
                onIonChange={(e) => optionsAddress(e.detail.value)}
                placeholder="R. José Paulino, 1234 - Centro, Campinas - SP, 13013-001"
                className="search-modal"
              />
            </div>
            {addressResults.length > 0 ? (
              addressResults.map((item: any) => {
                return (
                  <div
                    key={item.value}
                    className="modal-search-results"
                    data-value={item.value}
                    data-label={item.label}
                    onClick={(e) => setAddress(e)}
                  >
                    {item.label}
                    <IonIcon
                      className="icon-results-modal"
                      icon={chevronForwardOutline}
                    />
                  </div>
                );
              })
            ) : (
              <>
                <IonProgressBar type="indeterminate" />
                <br />
              </>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default BuscarTransporte;