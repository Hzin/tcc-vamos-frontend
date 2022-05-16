import { IonContent, IonPage, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { search } from 'ionicons/icons';
import './BuscarPassageiro.css';

import { Map, Marker, Overlay } from "pigeon-maps";
import { maptiler } from 'pigeon-maps/providers';
import { useEffect, useState } from 'react';

import RecordsStore from '../../store/RecordsStore';
import { fetchRecords } from '../../store/Selectors';
import { getUsersSearching } from '../../services/users';

const maptilerProvider = maptiler('d5JQJPLLuap8TkJJlTdJ', 'streets');

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

	const [ currentPoint, setCurrentPoint ] = useState({ latitude: 40.8264691, longitude: -73.9549618 });

	const records = RecordsStore.useState(fetchRecords);
	const center = { latitude: 40.8264691, longitude: -73.9549618 };

	const [ results, setResults ] = useState([]);
	const [ zoom, setZoom ] = useState(14);

	const [ moveMode, setMoveMode ] = useState(false);

	// useEffect(() => {

	// 	const getData = async () => {

	// 		await getUsersSearching(currentPoint);
	// 	}

	// 	getData();
	// }, [ currentPoint ]);

	useEffect(() => {

		setResults(records);
	}, [ records ]);

	const hideMarkers = () => {
    console.log('entrou')
		const tempRecords = JSON.parse(JSON.stringify(results));
		tempRecords.forEach((tempRecord:any) => tempRecord.showInfo = false);
    console.log(tempRecords)
		setResults(tempRecords);
	}

  const handleMap = (e:any) => {
    console.log(e)
    setCurrentPoint({ latitude: e.center[0], longitude: e.center[1] });
	}

  const searchResults = async () => {
    await getUsersSearching(currentPoint);
  }

  return (
    <IonPage>
			<IonContent fullscreen>
				{/* { results &&
					<> */}
						<Map onBoundsChanged={e => handleMap(e)} defaultCenter={ [center.latitude, center.longitude] } defaultZoom={ zoom } provider={ maptilerProvider } touchEvents={ true }>

							{ results.map((record:{latitude:any, longitude:any}, index) => {

								return <Marker key={ index } color="#3578e5" width={ 50 } anchor={ [ record.latitude, record.longitude ] } />
							})}

							{ results.map((record:{showInfo:boolean, latitude:any, longitude:any}, index) => {

								if (record.showInfo) {
									
									return (
										<Overlay key={ index } anchor={ [ record.latitude, record.longitude ] } offset={[95, 304]}>
											{/* <MapOverlay record={ record } /> */}
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