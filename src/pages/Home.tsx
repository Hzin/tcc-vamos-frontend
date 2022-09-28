import {
  IonAccordion,
  IonAccordionGroup,
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

import { UserContext } from "../App";

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

const Home: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();

  const user = useContext(UserContext);

  const [clock, setClock] = useState<any>();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<Color>("primary");

  useEffect(() => {
    setClock(startTime());

    if (location.state && location.state.redirectData) {
      const redirectData = location.state.redirectData;

      if (redirectData.showToastMessage) {
        setToastColor(redirectData.toastColor);
        setToastMessage(redirectData.toastMessage);
        setShowToast(true);
      }
    }

    const refreshUserToken = async () => {
      await sessionRoutes
        .refresh()
        .then((response) => {
          if (response.status === "error") {
            // setMessageToast(response.message);
            // setShowToast(true);

            history.push(`/login`);
            return;
          }

          user.setIsLoggedIn(true);
        })
        .catch((error) => {
          // if (!error.response) return

          // se o backend retornou uma mensagem de erro customizada
          // if (error.response.data.message) {
          console.dir("Houve um erro: ", { error });
          // alert('Houve um erro')
          history.push(`/login`);
        });
    };

    refreshUserToken();
  }, [location.state, user, history]);

  useEffect(() => {
    getUserTodaysTrips();
  }, []);

  const [todaysTrips, setTodaysTrips] =
    useState<tripsService.GetTripsFeedResponse[]>();
  const [notTodaysTrips, setNotTodaysTrips] =
    useState<tripsService.GetTripsFeedResponse[]>();

  const getUserTodaysTrips = async () => {
    await tripsService.getTodaysTrips().then((response) => {
      setTodaysTrips(response);
    });

    await tripsService.getNotTodaysTrips().then((response) => {
      setNotTodaysTrips(response);
    });
  };

  return (
    <IonPage>
      <PageHeader pageName="Página inicial" />

      <IonContent>
        <IonList>
          <IonAccordionGroup value="today">
            <IonAccordion value="today">
              <IonItem slot="header" color="primary">
                <IonLabel>Viagens de hoje - {clock}</IonLabel>
              </IonItem>

              {todaysTrips ? (
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

              {notTodaysTrips ? (
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

export default Home;
