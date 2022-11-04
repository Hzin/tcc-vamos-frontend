import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { Itinerary } from "../models/itinerary.model";
import { CardItinerary } from "./CardItinerary";

interface ComponentProps {
  itinerary: Itinerary;
}

export const CardItineraryRequestContractModerar = (props: ComponentProps) => {
  const history = useHistory();

  const [hasPassengerRequests, setHasPassengerRequests] = useState(false)

  useEffect(() => {
    if (props.itinerary.passengerRequests) {
      setHasPassengerRequests(true)
    }
  }, [props])

  const checkRequests = () => {
    // TODO
  }

  return (
    <CardItinerary
      disabled={!hasPassengerRequests}
      itinerary={props.itinerary}

      visualizeButton={
        { label: 'Ver requisições', onClick: checkRequests }
      }
    />
  );
}