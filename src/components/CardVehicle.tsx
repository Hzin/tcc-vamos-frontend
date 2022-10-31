import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from "@ionic/react";
import { peopleOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { VehicleInfo } from "../services/functions/vehiclesService";

interface ComponentProps {
  vehicle: VehicleInfo;
}

export const CardVehicle = (props: ComponentProps) => {
  const history = useHistory();

  return (
    <IonCard
      button
      onClick={() => {
        history.push({
          pathname: `/veiculo/placa/${props.vehicle.plate}`,
        });
      }}
    >
      {props.vehicle.picture ? (<img alt="vehicle_pic" src={props.vehicle.picture} />) : <></>}
      <IonCardHeader>
        <IonCardTitle>
          {props.vehicle.brand} {props.vehicle.model}
        </IonCardTitle>
        <IonCardSubtitle>Placa: {props.vehicle.plate}</IonCardSubtitle>
      </IonCardHeader>
      <>
        <IonCardContent>
          <IonIcon icon={peopleOutline} size={"small"} />{" "}
          {props.vehicle.seats_number} assentos -{" "}
          {props.vehicle.locator_name ? (
            <>Locador: {props.vehicle.locator_name}</>
          ) : (
            <>Não é alugado</>
          )}
        </IonCardContent>
      </>
    </IonCard>
  );
}