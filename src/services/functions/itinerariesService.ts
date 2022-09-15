import { searchItinerariesBody } from '../../models/searchItinerariesBody.model';
import * as itinerariesRoutes from '../api/itineraries';

export async function getAllItineraries(): Promise<any> {
  let res: any;

  try {
    res = await itinerariesRoutes.get();
  } catch (error) {
    // TODO
  }

  return res.data
}


export async function searchItineraries(body: searchItinerariesBody): Promise<any> {
  let res: any
  try {
    res = await itinerariesRoutes.search(body);
  } catch (error) {
    // TODO
  }

  return res.data
}

export default { getAllItineraries, searchItineraries }
