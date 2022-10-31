import {
  IonContent,
  IonPage,
  IonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import * as vehiclesService from "../services/functions/vehiclesService";

import sessionsService from "../services/functions/sessionsService";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";
import { CardVehicle } from "../components/CardVehicle";
import { CardInfoBasic } from "../components/CardInfoBasic";

interface VehiclesItineraryCreationStatus {
  vehicle_plate: string,
  canCreate: boolean
}

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const MeusVeiculos: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [vehiclesList, setVehiclesList] = useState<vehiclesService.VehicleInfo[]>();

  const redirectUserToLogin = () => {
    history.push({ pathname: "/login" });
  };

  useEffect(() => {
    const getUserVehiclesList = async () => {
      let userId = "";

      const refreshSessionRes = await sessionsService.refreshSession();

      if (refreshSessionRes.error) {
        redirectUserToLogin();
        return;
      }

      if (refreshSessionRes.userId) {
        userId = refreshSessionRes.userId;
      }

      if (location.state && location.state.redirectData) {
        const redirectData = location.state.redirectData;
  
        if (redirectData.showToastMessage) {
          setToastColor(redirectData.toastColor);
          setToastMessage(redirectData.toastMessage);
          setShowToast(true);
        }
      }

      await vehiclesService
        .getByUserId(userId)
        .then((response) => {
          setVehiclesList(response);
        })
        .catch((err) => {
          setToastColor("danger");
          setToastMessage(err);
          setShowToast(true);
        });
    };

    getUserVehiclesList();
  }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Meus veículos"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent>
        {vehiclesList ? (
          <>
            <CardInfoBasic size="small" message='Toque em um veículo cadastrado para ver suas viagens e itinerários!' />

            {vehiclesList.map((vehicle, index) => {
              return (<CardVehicle key={index} vehicle={vehicle} />);
            })}
          </>
        ) : (
          <></>
        )}

        <IonToast
          position="top"
          color={toastColor}
          isOpen={showToast}
          onDidDismiss={() => closeToast(setShowToast)}
          message={toastMessage}
          duration={2500}
        />
      </IonContent>
    </IonPage>
  );
};

export default MeusVeiculos;
