import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
  IonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import {
  informationCircleOutline,
  peopleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import * as vehiclesService from "../services/functions/vehiclesService";

import sessionsService from "../services/functions/sessionsService";
import { closeToast } from "../services/utils";
import { PageHeader } from "../components/PageHeader";

const MeusVeiculos: React.FC = () => {
  const history = useHistory();

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
            <IonCard color={"primary"}>
              <IonCardContent>
                <IonIcon icon={informationCircleOutline} /> Toque em um veículo
                cadastrado para ver suas viagens e itinerários!
              </IonCardContent>
            </IonCard>

            {vehiclesList.map((vehicle, index) => {
              return (
                <IonCard
                  button
                  key={index}
                  onClick={() => {
                    history.push({
                      pathname: `/veiculo/placa/${vehicle.plate}`,
                    });
                  }}
                >
                  {vehicle.picture ? (<img alt="vehicle_pic" src={vehicle.picture} />) : <></>}
                  <IonCardHeader>
                    <IonCardTitle>
                      {vehicle.brand} {vehicle.model}
                    </IonCardTitle>
                    <IonCardSubtitle>Placa: {vehicle.plate}</IonCardSubtitle>
                  </IonCardHeader>
                  <>
                    <IonCardContent>
                      <IonIcon icon={peopleOutline} size={"small"} />{" "}
                      {vehicle.seats_number} assentos -{" "}
                      {vehicle.locator_name ? (
                        <>Locador: {vehicle.locator_name}</>
                      ) : (
                        <>Não é alugado</>
                      )}
                    </IonCardContent>
                  </>
                </IonCard>
              );
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
