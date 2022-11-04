import { IonCard } from "@ionic/react";
import { useEffect } from "react";
import { useHistory } from "react-router";

import PassengerRequest from "../models/passengerRequest.model";

interface ComponentProps {
  contract: PassengerRequest;
}

export const CardPassengerRequestContract = (props: ComponentProps) => {
  const history = useHistory();

  useEffect(() => {
  }, [])

  return (
    <IonCard onClick={() => { history.push(`a`) }}>

    </IonCard>
  );
}