import {
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { arrowForwardOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IonChipTripStatus } from "../components/IonChipTripStatus";

import { PageHeader } from "../components/PageHeader";
import { TripHistory } from "../models/tripHistory.model";

import * as tripsService from "../services/functions/tripsService";

import { formatDateObjectToDate, formatDateObjectToTime } from "../services/utils";

export interface ViagemHistoricoStatusProps {
  match?: {
    params: {
      id: string;
    };
  };

  id_trip?: string

  noHeaderBackButton?: boolean
}

const ViagemHistoricoStatus: React.FC<ViagemHistoricoStatusProps> = (props) => {
  const history = useHistory();

  const [tripHistory, setTripHistory] = useState<TripHistory[]>();

  useEffect(() => {
    loadPageInfo()
  }, []);

  const loadPageInfo = () => {
    if (props.id_trip) getTripHistoricInfo(props.id_trip)
    else if (props.match) getTripHistoricInfo(props.match.params.id)
    else history.goBack()
  }

  const getTripHistoricInfo = async (id_trip: string) => {
    const tripHistoric = await tripsService.getTripHistoricData({ tripId: id_trip })
    setTripHistory(tripHistoric)
  }

  return (
    <IonPage>
      <PageHeader pageName="Histórico da viagem" />

      <IonContent>
        {tripHistory && (
          <>
            {tripHistory.map((history, index) => {
              return (
                <IonCard key={index}>
                  <IonCardContent>
                    {/* {history.old_status && <><IonChipTripStatus status={history.old_status} /> {'->'} </>} */}
                    {history.old_status && <><IonChipTripStatus status={history.old_status} dontFadeFinishedStatusChip /> <IonIcon icon={arrowForwardOutline} /> </>}
                    {history.new_status && <IonChipTripStatus status={history.new_status} dontFadeFinishedStatusChip />}
                    {history.description && <p>{"Descrição: "} {history.description}</p>}
                    <p>{"Horário: "} {formatDateObjectToDate(history.created_at)} {", "} {formatDateObjectToTime(history.created_at)}</p>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViagemHistoricoStatus;
