import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import { search } from "ionicons/icons";

import { Map, Marker, Overlay } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import { useEffect, useState } from "react";

import { PageHeader } from "../components/PageHeader";
import { UserSearchInfos } from "../components/UserSearchInfos/UserSearchInfos";
import * as searchesService from "../services/functions/searchesService";
import RecordsStore from "../store/RecordsStore";
import { fetchRecords } from "../store/Selectors";

import { setStore } from "../store/RecordsStore";

const maptilerProvider = maptiler("d5JQJPLLuap8TkJJlTdJ", "streets");

const BuscarPassageiro: React.FC = () => {
  //	UNCOMMENT THESE TO USE CURRENT LOCATION.

  // const [ currentPoint, setCurrentPoint ] = useState(false);

  // useEffect(() => {

  // 	const getCurrentLocation = async () => {

  // 		const fetchedLocation = await getLocation();
  // 		setCurrentPoint(fetchedLocation.currentLocation);
  // 	}

  // 	getCurrentLocation();
  // }, []);

  // useIonViewWillEnter(() => {

  // 	getUsersSearching(currentPoint);
  // });

  const [currentPoint, setCurrentPoint] = useState<searchesService.SearchInRadiusBody>({
    latitude: -22.907829,
    longitude: -47.062943,
  });

  const records = RecordsStore.useState(fetchRecords);
  const center = { latitude: -22.907829, longitude: -47.062943 };

  const [results, setResults] = useState([]);
  const [zoom, setZoom] = useState(14);

  // const [ moveMode, setMoveMode ] = useState(false);

  // useEffect(() => {

  // 	const getData = async () => {

  // 		await getUsersSearching(currentPoint);
  // 	}

  // 	getData();
  // }, [ currentPoint ]);

  useEffect(() => {
    setResults(records);
  }, [records]);

  const hideMarkers = () => {
    console.log("entrou");
    const tempRecords = JSON.parse(JSON.stringify(results));
    tempRecords.forEach((tempRecord: any) => (tempRecord.showInfo = false));
    console.log(tempRecords);
    setResults(tempRecords);
  };

  const handleMap = (e: any) => {
    setCurrentPoint({ latitude: e.center[0], longitude: e.center[1] });
  };

  const searchResults = async () => {
    console.log(currentPoint)
    const usersSearching = await searchesService.searchInRadius(currentPoint);
    console.log(usersSearching)
    setStore(usersSearching);
  };

  const showMarkerInfo = (e: any, index: any) => {
    const tempRecords = JSON.parse(JSON.stringify(results));

    //	Hide all current marker infos
    !tempRecords[index].showInfo &&
      tempRecords.forEach((tempRecord: any) => (tempRecord.showInfo = false));
    tempRecords[index].showInfo = !tempRecords[index].showInfo;

    console.log(tempRecords);
    setResults(tempRecords);
  };

  return (
    <IonPage>
      <PageHeader
        pageName="Buscar passageiros"
        backButtonPageUrl="/buscas"
      ></PageHeader>
      <IonContent fullscreen>
        {/* { results &&
					<> */}
        <Map
          onBoundsChanged={(e) => handleMap(e)}
          defaultCenter={[center.latitude, center.longitude]}
          defaultZoom={zoom}
          provider={maptilerProvider}
          touchEvents={true}
        >
          {results &&
            results.map(
              (record: { latitude_from: any; longitude_from: any }, index) => {
                return (
                  <Marker
                    onClick={(e) => showMarkerInfo(e, index)}
                    key={index}
                    color="#3578e5"
                    width={50}
                    anchor={[
                      parseFloat(record.latitude_from),
                      parseFloat(record.longitude_from),
                    ]}
                  />
                );
              }
            )}

          {results.map((record: any, index) => {
            if (record.showInfo) {
              return (
                <Overlay
                  key={index}
                  anchor={[
                    parseFloat(record.latitude_from),
                    parseFloat(record.longitude_from),
                  ]}
                  offset={[95, 304]}
                >
                  <UserSearchInfos record={record} />
                </Overlay>
              );
            }
          })}
        </Map>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon onClick={searchResults} icon={search} />
          </IonFabButton>
        </IonFab>
        {/* </> */}
        {/* } */}
      </IonContent>
    </IonPage>
  );
};

export default BuscarPassageiro;
