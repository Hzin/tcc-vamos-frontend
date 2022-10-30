import { IonButton, IonButtons, IonContent, IonList, IonPage, IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";

import { Color } from "@ionic/core";

import { closeToast, createElement } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

import * as vehiclesService from "../services/functions/vehiclesService";
import { VehicleDocumentCard } from "../components/VehicleDocumentCard";
import { useLocation } from "react-router";
import { CustomToast } from "../components/CustomToast";

interface LocationState {
  redirectData?: {
    toastColor: Color;
    toastMessage: string;
    toastPosition: string;
  };
}

const ModerarDocumentos: React.FC = () => {
  const location = useLocation<LocationState>();

  const [documentsInfo, setDocumentsInfo] = useState<vehiclesService.GetPendingDocumentsResponse[]>();

  useEffect(() => {
    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.toastMessage) {
        createElement(`<CustomToast message="${redirectData.toastMessage}" color="${redirectData.toastColor}" position="${redirectData.toastPosition}" />`)
      }
    }

    const getPendingDocuments = async () => {
      await vehiclesService.getPendingDocuments().then((response) => {
        if (!response) return
        setDocumentsInfo(response);
      });
    };

    getPendingDocuments();
  }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Moderar documentos"
        backButtonPageUrl="/perfil"
      />

      <IonContent>
        <IonList>
          {documentsInfo && documentsInfo.length !== 0 ? (
            documentsInfo.map((info, index) => {
              return (
                <VehicleDocumentCard
                  key={index}
                  document_status={info.document_status}
                  document_type={info.document_type.toUpperCase()}
                  document_url={info.document_url}
                  vehicle_brand={info.vehicle_brand}
                  vehicle_model={info.vehicle_model}
                  vehicle_plate={info.vehicle_plate}
                  vehicle_picture={info.vehicle_picture}
                />
              )
            })
          ) : (
            <div className="ion-padding">
              Não há documentos para moderar!
            </div>
          )}
        </IonList>

        {/* <IonToast
          position="top"
          color="danger"
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={messageToast}
          duration={2500}
        /> */}
      </IonContent>
    </IonPage>
  );
};

export default ModerarDocumentos;
