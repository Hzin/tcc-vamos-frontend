import { IonContent, IonPage, IonToast } from "@ionic/react";
import React, { useEffect, useState } from "react";

import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

import * as vehiclesService from "../services/functions/vehiclesService";
import { Vehicle } from "../models/vehicle.model";
import { VehicleDocumentCard } from "../components/VehicleDocumentCard";

const ModerarDocumentos: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [messageToast, setMessageToast] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>();

  useEffect(() => {
    getPendingDocuments();
  }, []);

  const getPendingDocuments = async () => {
    await vehiclesService.getPendingDocuments().then((response) => {
      if (!response) return;

      setVehicles(response);
    });
  };

  return (
    <IonPage>
      <PageHeader
        pageName="Moderar documentos"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      {vehicles && vehicles.length === 0 ? (
        vehicles.filter((vehicle) => { 
          if (!vehicle.documents) return false
          return true 
        }

        vehicles.map((vehicle) => {
          if (!vehicle.documents) return;

          vehicle.documents.map((document, index) => {
            return (
              <VehicleDocumentCard
                key={index}
                vehicle={vehicle}
                document={document}
              />
            );
          });
        })
      ) : (
        <div className="ion-padding" slot="content">
          Não há documentos para moderar!
        </div>
      )}

      <IonContent fullscreen>
        <IonToast
          position="top"
          color="danger"
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={messageToast}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default ModerarDocumentos;
