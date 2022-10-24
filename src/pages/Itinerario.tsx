import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { carOutline } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import { UserContext } from "../App";

import * as vehiclesRoutes from "../services/api/vehicles";

import sessionsService from "../services/functions/sessionsService";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

const Itinerario: React.FC = () => {
  const history = useHistory();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  const [userVehicles, setUserVehicles] = useState<vehiclesRoutes.VehicleInfo[]>();

  const redirectUserToLogin = () => {
    history.push({ pathname: "/login" });
  };

  useEffect(() => {
    const getUserVehicles = async () => {
      let userId = "";

      const refreshSessionRes = await sessionsService.refreshSession();

      if (refreshSessionRes.error) {
        redirectUserToLogin();
        return;
      }

      if (refreshSessionRes.userId) {
        userId = refreshSessionRes.userId;
      }

      vehiclesRoutes
        .getByUserId(userId)
        .then((response) => {
          setUserVehicles(response);
        })
        .catch((err) => {
          setToastColor("danger");
          setToastMessage(err);
          setShowToast(true);
        });
    };

    getUserVehicles();
  }, []);

  return (
    <IonPage>
      <PageHeader
        pageName="Minhas vehicles"
        backButtonPageUrl="/perfil"
      ></PageHeader>

      <IonContent>
        {userVehicles ? (
          userVehicles.map((vehicle, index) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{vehicle.plate}</IonCardTitle>
                  <IonCardSubtitle>
                    {vehicle.brand} - {vehicle.model}
                  </IonCardSubtitle>
                </IonCardHeader>
                {vehicle.locator_name ? (
                  <>
                    <IonCardContent>
                      {vehicle.seats_number} assentos - Locador:{" "}
                      {vehicle.locator_name}
                    </IonCardContent>
                  </>
                ) : (
                  <>
                    <IonCardContent>
                      {vehicle.seats_number} assentos - Não é alugado
                    </IonCardContent>
                  </>
                )}
              </IonCard>
            );
          })
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

export default Itinerario;
