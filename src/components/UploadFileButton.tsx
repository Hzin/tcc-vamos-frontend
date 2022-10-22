import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { cameraOutline } from "ionicons/icons";
import { useState } from "react";

interface ComponentProps {
  id: string;
  componentStyle: "input" | "fab";
  acceptedFiles: string;
  // se presentActionSheet existir, redefineFileFunction também deve existir
  presentActionSheet: boolean;
  // confirmDialog: boolean;

  // chooseFileFunction: Function;
  redefineFileFunction?: Function;
  uploadFileFunction: Function;
}

export const UploadFileButton = (props: ComponentProps) => {
  // antes de tudo...
  if (props.presentActionSheet && !props.redefineFileFunction)
    throw new Error("Aaa123");

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [present] = useIonActionSheet();
  const [presentAlertConfirmation] = useIonAlert();

  const presentActionSheet = () => {
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
      onDidDismiss: (e: CustomEvent) => {
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;

        if (e.detail.role === "choose") {
          handleOnChange(e);
          return;
        }

        if (e.detail.role === "reset") {
          if (!props.redefineFileFunction) return;
          props.redefineFileFunction();
          return;
        }
      },
    });
  };

  const presentConfirmation = async (message: string, fn: Function) => {
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
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return;
        
        await fn();
      },
    });
  };

  const handleOnChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  if (props.componentStyle === "input") {
    return (
      <>
        <IonItem>
          <input
            type="file"
            id={props.id}
            accept={props.acceptedFiles}
            // className="invisible"
            onChange={handleOnChange}
            onClick={props.presentActionSheet ? presentActionSheet : undefined}
          />
        </IonItem>
          <IonButton
            onClick={() => {
              presentConfirmation('Confirma o envio do arquivo?', props.uploadFileFunction);
            }}
            disabled={!isFilePicked}
            className="ion-margin-top"
            expand="block"
          >
            Enviar
          </IonButton>
      </>
    );
  } else {
    // fab
    return (
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={cameraOutline} onClick={presentActionSheet} />
        </IonFabButton>
      </IonFab>
    );
  }
};
