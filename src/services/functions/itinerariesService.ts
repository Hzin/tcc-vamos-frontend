import * as itinerariesRoutes from '../api/itineraries';

interface CoordinatesRequest {
  coordinatesFrom:{
    lat: number,
    lng: number
  },
  coordinatesTo:{
    lat: number,
    lng: number
  }
}

export async function getAllItineraries() : Promise<any> {
  let res: any;

  try {
    res = await itinerariesRoutes.get();
  } catch (error) {
    // TODO
  }

  return res.data
}


export async function searchItineraries(request: CoordinatesRequest) : Promise<any> {
  let res
  try {
    let res : any = await itinerariesRoutes.search(request);
  } catch (error) {
    // TODO
  }
}

export default { getAllItineraries, searchItineraries }
