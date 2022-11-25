import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToast,
} from "@ionic/react";
import { Color } from "@ionic/core";
import { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import * as sessionRoutes from "../services/api/session";
import { closeToast, startTime } from "../services/utils";

import * as tripsService from "../services/functions/tripsService";
import { PageHeader } from "../components/PageHeader";
import { TripCard } from "../components/TripCard";

interface LocationState {
  redirectData?: {
    showToastMessage: boolean;
    toastColor: Color;
    toastMessage: string;
  };
}

const HomeFeedViagensMeusMotorista: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const [clock, setClock] = useState<any>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    setClock(startTime());
  }, [location.state, history]);

  useEffect(() => {
    getUserTodaysTripsAsDriver();
  }, []);

  const [todaysTrips, setTodaysTrips] =
    useState<tripsService.GetTripsFeedResponse[]>();
  const [notTodaysTrips, setNotTodaysTrips] =
    useState<tripsService.GetTripsFeedResponse[]>();

  const getUserTodaysTripsAsDriver = async () => {
    await tripsService.getTodaysTripsAsDriver().then((response) => {
      setTodaysTrips(response);
    });

    await tripsService.getNotTodaysTripsAsDriver().then((response) => {
      setNotTodaysTrips(response);
    });
  };

  return (
    <IonPage>
      <PageHeader pageName="Viagens (como motorista)" showBackButton />

      <IonContent>
        <IonList>
          <IonAccordionGroup value="today">
            <IonAccordion value="today">
              <IonItem slot="header" color="primary">
                <IonLabel>Viagens de hoje - {clock}</IonLabel>
              </IonItem>

              {todaysTrips && todaysTrips.length !== 0 ? (
                todaysTrips.map((tripInfo, index) => {
                  return (
                    <TripCard
                      key={index}
                      slot="content"
                      itinerary={tripInfo.itinerary}
                      tripStatus={tripInfo.tripStatus}
                      clickable={true}
                      tripId={tripInfo.tripId}
                    ></TripCard>
                  );
                })
              ) : (
                <div className="ion-padding" slot="content">
                  Sem viagens para hoje!
                </div>
              )}
            </IonAccordion>
          </IonAccordionGroup>

          <IonAccordionGroup value="nottoday">
            <IonAccordion>
              <IonItem slot="header" color="primary">
                <IonLabel>Próximas viagens</IonLabel>
              </IonItem>

              {notTodaysTrips && notTodaysTrips.length !== 0 ? (
                notTodaysTrips.map((tripInfo, index) => {
                  return (
                    <TripCard
                      key={index}
                      slot="content"
                      itinerary={tripInfo.itinerary}
                      clickable={false}
                    ></TripCard>
                  );
                })
              ) : (
                <div className="ion-padding" slot="content">
                  Sem próximas viagens!
                </div>
              )}
            </IonAccordion>
          </IonAccordionGroup>
        </IonList>

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

export default HomeFeedViagensMeusMotorista;