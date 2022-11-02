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
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToast,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { PhotoViewer } from "@awesome-cordova-plugins/photo-viewer";

import { closeToast } from "../services/utils";

import * as vehiclesService from "../services/functions/vehiclesService";
import { PageHeader } from "../components/PageHeader";
import { VehicleInfo } from "../services/functions/vehiclesService";

import { vehicleDocumentStatus } from "../constants/vehicleDocumentStatus";
import { cameraOutline } from "ionicons/icons";
import { VehiclePicture } from "../components/VehiclePicture";
import { CardInfoBasicIntoAlertInfo } from "../components/CardInfoBasicIntoAlertInfo";

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
    case vehicleDocumentStatus.rejected:
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

interface IonChipItineraryCreationStatusProps {
  status: boolean | undefined
}

export const IonChipItineraryCreationStatus = (props: IonChipItineraryCreationStatusProps) => {
  if (props.status === undefined) {
    return <></>;
  }

  let ionChipColor: Color = "success", ionChipLabel = "Pode criar itinerários";

  if (!props.status) {
    ionChipColor = "warning"
    ionChipLabel = "Não pode criar itinerários"
  }

  return (
    <>
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

  const [, setSelectedFileVehiclePicture] =
    useState();

  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  const [willUpload, setWillUpload] = useState(false);

  const [documentFileUrl, setDocumentFileUrl] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVehicle = async (vehicle_plate: string) => {
    await vehiclesService.getByPlate(vehicle_plate).then((response) => {
      setVehicleInfo(response);
      getVehiclesItineraryCreationStatus(response.plate)
    });
  };

  const [vehicleCanCreateItineraries, setVehicleCanCreateItineraries] = useState<boolean>();

  const getVehiclesItineraryCreationStatus = async (vehicle_plate: string) => {
    await vehiclesService
      .canCreateItineraries(vehicle_plate)
      .then((response) => {
        setVehicleCanCreateItineraries(response.data)
      })
  }

  const handleChangeFileVehicleDocument = (e: any) => {
    setSelectedFileVehicleDocument(e.target.files[0]);
    setIsFilePickedVehicleDocument(true);
  };

  const handleChangeFileVehiclePicture = async (e: any) => {
    await handleConfirmFileUpload("picture", e.target.files[0]);
  };

  const clearDocumentFormItems = () => {
    setWillUpload(false);
    setDocumentStatus(undefined);
    setDocumentFileUrl("");

    setSelectedFileVehicleDocument(undefined);
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

  const handleUploadVehiclePicture = async (file: any) => {
    if (!vehicleInfo) return;
    if (!file) return;

    await vehiclesService
      .uploadPictureFile(file, vehicleInfo.plate)
      .then((response: any) => {
        if (!response.message) return;

        let newVehicleInfo: VehicleInfo = vehicleInfo;
        newVehicleInfo.picture = response.data;
        setVehicleInfo(newVehicleInfo);

        handleChangeDocumentType(selectedDocumentType);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleDeleteDocumentFile = async () => {
    if (!vehicleInfo) return;
    if (!selectedDocumentType) return;

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

    await vehiclesService
      .deletePictureFile(vehicleInfo.plate)
      .then((response: any) => {
        if (!response.message) return;

        let newVehicleInfo: VehicleInfo = vehicleInfo;
        newVehicleInfo.picture = response.data;
        setVehicleInfo(newVehicleInfo);

        setToastColor("success");
        setToastMessage(response.message);
        setShowToast(true);
      });
  };

  const handleUploadVehiclePictureClick = () => {
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

        setDocumentFileUrl(response);
        setDocumentStatus(response.status);
      });
  };

  const handleOpenDocument = () => {
    PhotoViewer.show(documentFileUrl);
  };

  const clearInputElementValue = (id: string) => {
    const element = document.getElementById(id) as HTMLInputElement;
    element.value = "";

    if (id === "btn_vehicle_pic") setSelectedFileVehiclePicture(undefined);
  };

  const [presentAlertConfirmation] = useIonAlert();

  const handleConfirmFileUpload = async (
    action: "document" | "picture",
    file?: any
  ) => {
    await presentAlertConfirmation({
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
            clearInputElementValue("btn_vehicle_pic");
          }

          return;
        }

        switch (action) {
          case "document":
            await handleUploadVehicleDocument();
            break;
          case "picture":
            if (!file) return;
            await handleUploadVehiclePicture(file);
            break;
          default:
            break;
        }

        if (action === "picture") clearInputElementValue("btn_vehicle_pic");
      },
    });
  };

  const handleConfirmFileDelete = async (action: "document" | "picture") => {
    let message = "";

    switch (action) {
      case "document":
        message = "Deseja deletar o documento selecionado?";
        break;
      case "picture":
        message = "Deseja redefinir a foto do veículo?";
        break;
      default:
        break;
    }

    presentAlertConfirmation({
      header: message,
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
        // chamo a função setSelectedFileVehiclePicture porque o element <input>
        // precisa ter a seleção redefinida para eu poder escolher
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") {
          if (action === "picture") {
            clearInputElementValue("btn_vehicle_pic");
          }
          return;
        }

        switch (action) {
          case "document":
            await handleDeleteDocumentFile();
            break;
          case "picture":
            await handleDeletePictureFile();
            break;
          default:
            break;
        }

        if (e.detail.role === "confirmAction" && action === "picture") {
          clearInputElementValue("btn_vehicle_pic");
        }
      },
    });
  };

  const handleConfirmVehicleDelete = () => {
    if (!vehicleInfo) return

    presentAlertConfirmation({
      header: 'Confirma a deleção do veículo?',
      subHeader: 'Digite a placa do veículo para confirmar a ação',
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
      inputs: [
        {
          placeholder: 'Placa',
          attributes: {
            maxlength: 7,
          },
        },
      ],

      onDidDismiss: async (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") {
          return;
        }

        interface valuesObj {
          0: string
        }

        const values: valuesObj = e.detail.data.values
        const insertedPlate = values[0]

        if (insertedPlate !== vehicleInfo.plate) {
          setToastColor("warning");
          setToastMessage('A placa informada não é igual a placa do veículo');
          setShowToast(true);

          return
        }

        await vehiclesService.deleteVehicle(vehicleInfo.plate).then((response) => {
          history.push({
            pathname: "/veiculos/meus",
            state: {
              redirectData: {
                showToastMessage: true,
                toastColor: "success",
                toastMessage: response,
              },
            },
          });
        });
      },
    });
  }

  // action sheet
  const [present] = useIonActionSheet();

  const showActionSheet = (action: "document" | "picture") => {
    present({
      // header: "Escolher arquivo",
      buttons: [
        {
          text: "Escolher arquivo",
          role: "choose",
        },
        {
          text: "Redefinir",
          role: "reset",
        },
        {
          text: "Cancelar",
          role: "cancel",
        },
      ],
      onDidDismiss: async (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") {
          if (action === "picture") {
            clearInputElementValue("btn_vehicle_pic");
            setSelectedFileVehiclePicture(undefined);
          }

          return;
        }

        if (e.detail.role === "choose") {
          if (action === "document") {
            await handleUploadVehicleDocument();
            return;
          }
          if (action === "picture") {
            handleUploadVehiclePictureClick();
            return;
          }
        }

        if (e.detail.role === "reset") {
          if (action === "picture") {
            await handleConfirmFileDelete("picture");
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
            <VehiclePicture picture_path={vehicleInfo.picture} center />

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
                {vehicleInfo.brand} {vehicleInfo.model}
              </h1>

              <h1 className="mb-3 text-xl ion-text-center">
                {vehicleInfo.plate} - {vehicleInfo.seats_number} assentos
              </h1>
            </div>

            <IonGrid className="ion-padding">
              <IonRow>
                <IonCol size="12">
                  <IonChipItineraryCreationStatus status={vehicleCanCreateItineraries} />
                </IonCol>
              </IonRow>

              {!vehicleCanCreateItineraries && (
                <IonRow>
                  <IonCol size="12">
                    <CardInfoBasicIntoAlertInfo alertMessage="Para poder criar itinerários, o veículo precisa ter os documentos 'CRLV' e 'CRV' enviados e aprovados pela moderação!" message="Por que ainda não posso criar itinerários?" size="medium" />
                  </IonCol>
                </IonRow>
              )}

              <IonRow>
                <IonCol size="12">
                  <IonCardTitle>Opções</IonCardTitle>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonItem>
                    <IonLabel>Deletar o veículo</IonLabel>
                    <IonButton onClick={handleConfirmVehicleDelete} color="danger">Deletar</IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>

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
                        handleConfirmFileDelete("document");
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
                              handleConfirmFileUpload("document");
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
              onChange={async (e: any) => {
                handleChangeFileVehiclePicture(e);
              }}
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
