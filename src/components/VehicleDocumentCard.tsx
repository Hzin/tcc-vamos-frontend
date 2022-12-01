import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  useIonAlert,
  IonToast,
} from "@ionic/react";

import { Color } from "@ionic/core";

import { vehicleDocumentStatus } from "../constants/vehicleDocumentStatus";

import * as vehiclesService from "../services/functions/vehiclesService";
import { closeToast, convertFilePathToStaticUrl, reloadPage } from "../services/utils";
import { useState } from "react";
import { ShowImageFileAsModal } from "./ShowPageAsModal/ShowImageFileAsModal";

interface VehicleDocumentCardProps extends vehiclesService.GetPendingDocumentsResponse {
  keyId: number
}

export const VehicleDocumentCard = (props: VehicleDocumentCardProps) => {
  const modalId = `modal-document-${props.keyId}`

  const [toastShow, setToastShow] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("");
  const [toastPosition, setToastPosition] = useState<"top" | "bottom" | "middle" | undefined>();

  const [presentAlertConfirmation] = useIonAlert();

  const handleConfirmAction = async (action: "approve" | "reject") => {
    let message = "";

    switch (action) {
      case "approve":
        message = "Deseja aprovar o documento selecionado?";
        break;
      case "reject":
        message = "Deseja recusar o documento selecionado?";
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
        if (e.detail.role === "cancel" || e.detail.role === "backdrop") return

        switch (action) {
          case "approve":
            await vehiclesService.updateDocumentStatus(props.vehicle_plate, props.document_type, vehicleDocumentStatus.approved).then((response) => {
              if (!response) return
              showToastAndHideComponent(response)
            })
            break;
          case "reject":
            await vehiclesService.updateDocumentStatus(props.vehicle_plate, props.document_type, vehicleDocumentStatus.rejected).then((response) => {
              if (!response) return
              showToastAndHideComponent(response)
            })
            break;
          default:
            break;
        }
      },
    });
  };

  // TODO, gambiarra
  const showToastAndHideComponent = (message: string) => {
    setToastMessage(message)
    setToastColor('success')
    setToastPosition('bottom')
    setToastShow(true)

    // const elm = document.getElementById('component')
    // elm?.classList.add('invisible')
    reloadPage()
  }

  return (
    <>
      <IonCard id="component">
        <IonCardHeader>
          <IonCardSubtitle>
            <div>{props.vehicle_brand} - {props.vehicle_model}</div>
            <div>Documento: {props.document_type}</div>
          </IonCardSubtitle>
          <IonCardTitle>
            Placa: {props.vehicle_plate}
          </IonCardTitle>
        </IonCardHeader>

        <div className="flex justify-between">
          <div>
            <IonButton id={modalId} fill="clear">Abrir</IonButton>
          </div>

          <div>
            <IonButton fill="clear" onClick={() => { handleConfirmAction('approve') }}>Aprovar</IonButton>
            <IonButton fill="clear" onClick={() => { handleConfirmAction('reject') }}>Recusar</IonButton>
          </div>
        </div>
      </IonCard>

      <ShowImageFileAsModal trigger={modalId} url={convertFilePathToStaticUrl(props.document_url)} title={props.document_type} />

      <IonToast
        position={toastPosition}
        color={toastColor}
        isOpen={toastShow}
        onDidDismiss={() => closeToast(setToastShow)}
        message={toastMessage}
        duration={2500}
      />
    </>
  );
};
