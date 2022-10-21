import {
  IonButton,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
  useIonAlert,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

import { PhotoViewer } from "@awesome-cordova-plugins/photo-viewer";

import { closeToast } from "../services/utils";

import * as vehiclesService from "../services/functions/vehiclesService";
import { PageHeader } from "../components/PageHeader";
import { Vehicle } from "../models/van.model";
import { VehicleInfo } from "../services/api/vehicles";

import apiConfig from "../config/api.config";
import { vehicleDocumentStatus } from "../constants/vehicleDocumentStatus";

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface ScanNewProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface IonChipVehicleDocumentStatusProps {
  status?: string;
}

const IonChipVehicleDocumentStatus = (
  props: IonChipVehicleDocumentStatusProps
) => {
  let ionChipColor = "",
    ionChipLabel = "";

  if (!props.status) {
    return (
      <>
        <IonChip color="warning">Não enviado</IonChip>
      </>
    );
  }

  switch (props.status) {
    case vehicleDocumentStatus.pending:
      ionChipColor = "warning";
      ionChipLabel = "Pendente confirmação";
      break;
    case vehicleDocumentStatus.approved:
      ionChipColor = "success";
      ionChipLabel = "Aprovado";
      break;
    case vehicleDocumentStatus.denied:
      ionChipColor = "danger";
      ionChipLabel = "Recusado";
      break;
    default:
      break;
  }

  return (
    <>
      <IonChip color="success">Enviado</IonChip>
      <IonChip color={ionChipColor}>{ionChipLabel}</IonChip>
    </>
  );
};

const Veiculo: React.FC<ScanNewProps> = (props) => {
  const history = useHistory();

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const [willUpload, setWillUpload] = useState(false);

  const [fileUrl, setFileUrl] = useState("");
  const [documentStatus, setDocumentStatus] = useState<vehicleDocumentStatus>();

  useEffect(() => {
    let vehicle_plate = "";

    if (!props.match.params.id) {
      history.push({
        pathname: "/home",
        state: {
          redirectData: {
            showToastMessage: true,
            toastColor: "warning",
            toastMessage: "A viagem não existe.",
          },
        },
      });
    }

    vehicle_plate = props.match.params.id;
    getVehicle(vehicle_plate);
  }, []);

  const getVehicle = async (vehicle_plate: string) => {
    await vehiclesService.getByPlate(vehicle_plate).then((response) => {
      setVehicleInfo(response);

      if (!vehicleInfo) return;
    });
  };

  const changeHandler = async (e: any) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const clearDocumentFormItems = () => {
    setWillUpload(false);
    setSelectedFile(undefined);
    setIsFilePicked(false);
    setDocumentStatus(undefined);
    setFileUrl("");
  };

  const handleSubmission = async () => {
    if (!vehicleInfo) return;
    if (!selectedFile) return;

    await vehiclesService
      .uploadFile(selectedFile, vehicleInfo.plate, selectedDocumentType)
      .then((response) => {
        if (!response.message) return;

        handleChangeDocumentType(selectedDocumentType);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleChangeDocumentType = async (newDocumentType: string) => {
    clearDocumentFormItems();
    setSelectedDocumentType(newDocumentType);

    if (!vehicleInfo) return;

    await vehiclesService
      .searchFile(vehicleInfo.plate, newDocumentType)
      .then((response: any) => {
        if (!response || !response.path || !response.status) {
          setFileUrl("");
          return;
        }

        setFileUrl(`${apiConfig.getStaticUrl()}/${response.path}`);
        setDocumentStatus(response.status);
      });
  };

  const handleOpenDocument = () => {
    PhotoViewer.show(fileUrl);
  };

  const [presentAlertConfirmation] = useIonAlert();

  const handleConfirmFileUpload = async () => {
    presentAlertConfirmation({
      header: "Confirma envio do arquivo?",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Confirmar",
          role: "confirmAction",
        },
      ],

      onDidDismiss: async (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;

        await handleSubmission();
      },
    });
  };

  return (
    <IonPage>
      <PageHeader
        pageName="Veículo"
        backButtonPageUrl="/home"
      />

      <IonContent>
        {!vehicleInfo ? (
          <></>
        ) : (
          <>
            <img
            className="max-h-72" 
            src="https://s2.glbimg.com/-xUhYluyWnnnib57vy3QI1kD9oQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/y/E/vdU7J0TeAIC2kZONmgBQ/2018-09-04-sprintervanfoto.jpg"></img>
            <div className="m-3">
              <h1 className="mb-3 text-2xl ion-text-center">
                {vehicleInfo.brand} - {vehicleInfo.model}
              </h1>

              <h1 className="mb-3 text-xl ion-text-center">
                {vehicleInfo.plate} - {vehicleInfo.seats_number} assentos
              </h1>
            </div>

            <IonGrid className="ion-padding">
              <IonRow>
                <IonCol size="12">
                  {/* <IonCardTitle>Como você deseja se cadastrar?</IonCardTitle> */}
                  <IonCardTitle>Documentos</IonCardTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel>Tipo de documento</IonLabel>
                    <IonSelect
                      onIonChange={(e: any) => {
                        handleChangeDocumentType(e.detail.value);
                      }}
                    >
                      <IonSelectOption value="crlv">CRLV</IonSelectOption>
                      <IonSelectOption value="crv">CRV</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonItem>
                <IonLabel>Status</IonLabel>
                <IonChipVehicleDocumentStatus status={documentStatus} />
              </IonItem>

              {fileUrl ? (
                <>
                  <IonItem>
                    <IonLabel>Visualizar documento</IonLabel>
                    <IonButton onClick={handleOpenDocument}>Abrir</IonButton>
                  </IonItem>
                </>
              ) : (
                <></>
              )}

              {selectedDocumentType ? (
                <>
                  <IonItem>
                    {documentStatus ? (
                      <IonLabel>Deseja reenviar o documento?</IonLabel>
                    ) : (
                      <IonLabel>Deseja enviar o documento?</IonLabel>
                    )}
                    <IonCheckbox
                      checked={willUpload}
                      onIonChange={(e) => setWillUpload(e.detail.checked)}
                    />
                  </IonItem>

                  {willUpload ? (
                    <>
                      <IonRow>
                        <IonCol size="12">
                          <IonItem>
                            <input
                              type="file"
                              id="vehicle_doc"
                              accept=".png,.jpg,.pdf"
                              onChange={changeHandler}
                            />
                          </IonItem>
                          <IonButton
                            onClick={handleConfirmFileUpload}
                            disabled={!isFilePicked}
                            className="ion-margin-top"
                            expand="block"
                          >
                            Enviar
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </IonGrid>

            <IonToast
              position="bottom"
              color={toastColor}
              isOpen={showToast}
              onDidDismiss={() => closeToast(setShowToast)}
              message={toastMessage}
              duration={2500}
            />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Veiculo;
