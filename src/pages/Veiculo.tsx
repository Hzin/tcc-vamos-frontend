import {
  IonButton,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonIcon,
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
  useIonActionSheet,
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
import { add, cameraOutline, createOutline } from "ionicons/icons";

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

  const [selectedFileVehicleDocument, setSelectedFileVehicleDocument] =
    useState();
  const [isFilePickedVehicleDocument, setIsFilePickedVehicleDocument] =
    useState(false);

  const [selectedFileVehiclePicture, setSelectedFileVehiclePicture] =
    useState();

  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const [willUpload, setWillUpload] = useState(false);

  const [documentFileUrl, setDocumentFileUrl] = useState("");
  const [documentStatus, setDocumentStatus] = useState<vehicleDocumentStatus>();

  const [picturetFileUrl, setPicturetFileUrl] = useState("");

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

  const handleChangeFileVehicleDocument = async (e: any) => {
    setSelectedFileVehicleDocument(e.target.files[0]);
    setIsFilePickedVehicleDocument(true);
  };

  const handleChangeFileVehiclePicture = async (e: any) => {
    setSelectedFileVehiclePicture(e.target.files[0]);
    handleConfirmFileUpload("picture", handleUploadVehiclePicture);
  };

  const clearDocumentFormItems = () => {
    setWillUpload(false);
    setDocumentStatus(undefined);
    setDocumentFileUrl("");

    setSelectedFileVehiclePicture(undefined);
  };

  const handleUploadVehicleDocument = async () => {
    if (!vehicleInfo) return;
    if (!selectedFileVehicleDocument) return;

    await vehiclesService
      .uploadDocumentFile(
        selectedFileVehicleDocument,
        vehicleInfo.plate,
        selectedDocumentType
      )
      .then((response: any) => {
        if (!response.message) return;

        handleChangeDocumentType(selectedDocumentType);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleUploadVehiclePicture = async () => {
    if (!vehicleInfo) return;
    if (!selectedFileVehiclePicture) return;

    await vehiclesService
      .uploadPictureFile(selectedFileVehiclePicture, vehicleInfo.plate)
      .then((response: any) => {
        if (!response.message) return;

        handleChangeDocumentType(selectedDocumentType);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleDeleteDocumentFile = async () => {
    if (!vehicleInfo) return;
    if (!selectedFileVehiclePicture) return;

    await vehiclesService
      .deleteDocumentFile(vehicleInfo.plate, selectedDocumentType)
      .then((response: any) => {
        if (!response.message) return;

        handleChangeDocumentType(selectedDocumentType);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleDeletePictureFile = async () => {
    if (!vehicleInfo) return;
    if (!selectedFileVehiclePicture) return;

    await vehiclesService
      .deletePictureFile(vehicleInfo.plate)
      .then((response: any) => {
        if (!response.message) return;

        setPicturetFileUrl(response.data);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleUploadVehiclePictureClick = async () => {
    const button = document.getElementById("btn_vehicle_pic");

    if (!button) return;

    button.click();
  };

  const handleChangeDocumentType = async (newDocumentType: string) => {
    clearDocumentFormItems();
    setSelectedDocumentType(newDocumentType);

    if (!vehicleInfo) return;

    await vehiclesService
      .searchDocumentFile(vehicleInfo.plate, newDocumentType)
      .then((response: any) => {
        if (!response || !response.path || !response.status) {
          setDocumentFileUrl("");
          return;
        }

        setDocumentFileUrl(`${apiConfig.getStaticUrl()}/${response.path}`);
        setDocumentStatus(response.status);
      });
  };

  const handleOpenDocument = () => {
    PhotoViewer.show(documentFileUrl);
  };

  const [presentAlertConfirmation] = useIonAlert();

  const handleConfirmFileUpload = async (
    action: "document" | "picture",
    fn: Function
  ) => {
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
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") {
          if (action === "picture") {
            const element = document.getElementById(
              "btn_vehicle_pic"
            ) as HTMLInputElement;
            element.value = "";
          }

          return;
        }

        await fn();
      },
    });
  };

  const handleConfirmFileDelete = async (fn: Function) => {
    presentAlertConfirmation({
      header: "Confirma deleção do arquivo?",
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

        await fn();
      },
    });
  };

  // action sheet
  const [present] = useIonActionSheet();

  const showActionSheet = (action: "document" | "picture") => {
    present({
      // header: "Escolher arquivo",
      buttons: [
        {
          text: "Escolher arquivo",
          role: "choose",
          handler: () => {},
        },
        {
          text: "Redefinir",
          role: "reset",
          handler: () => {},
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {},
        },
      ],
      onDidDismiss: async (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;

        if (e.detail.role === "choose") {
          if (action === "document") {
            await handleUploadVehicleDocument();
            return;
          }
          if (action === "picture") {
            await handleUploadVehiclePictureClick();
            return;
          }
        }

        if (e.detail.role === "reset") {
          if (action === "picture") {
            await handleConfirmFileDelete(handleDeleteDocumentFile);
            return;
          }
        }
      },
    });
  };

  return (
    <IonPage>
      <PageHeader pageName="Veículo" backButtonPageUrl="/home" />

      <IonContent>
        {!vehicleInfo ? (
          <></>
        ) : (
          <>
            <img
              className="max-h-72"
              alt="vehicle_picture"
              src="https://s2.glbimg.com/-xUhYluyWnnnib57vy3QI1kD9oQ=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/y/E/vdU7J0TeAIC2kZONmgBQ/2018-09-04-sprintervanfoto.jpg"
            ></img>

            <IonFab vertical="top" horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon
                  icon={cameraOutline}
                  onClick={() => {
                    showActionSheet("picture");
                  }}
                />
              </IonFabButton>
            </IonFab>

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

              {selectedDocumentType ? (
                <>
                  <IonItem>
                    <IonLabel>Status</IonLabel>
                    <IonChipVehicleDocumentStatus status={documentStatus} />
                  </IonItem>
                </>
              ) : (
                <></>
              )}

              {documentFileUrl ? (
                <>
                  <IonItem>
                    <IonLabel>Visualizar documento</IonLabel>
                    <IonButton onClick={handleOpenDocument}>Abrir</IonButton>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Deletar documento</IonLabel>
                    <IonButton
                      onClick={() => {
                        handleConfirmFileDelete(handleDeleteDocumentFile);
                      }}
                      color="danger"
                    >
                      Deletar
                    </IonButton>
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
                              onChange={handleChangeFileVehicleDocument}
                            />
                          </IonItem>
                          <IonButton
                            onClick={() => {
                              handleConfirmFileUpload(
                                "document",
                                handleUploadVehicleDocument
                              );
                            }}
                            disabled={!isFilePickedVehicleDocument}
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

            <input
              type="file"
              id="btn_vehicle_pic"
              accept=".png,.jpg,.pdf"
              className="invisible"
              onChange={handleChangeFileVehiclePicture}
            />

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
