import instance from './api';

import attendanceListsRoutes from '../../constants/routes/attendanceListsRoutes';
import { GetUserStatusInTripRequest } from '../functions/attendanceListsService';

export async function getUserStatusInTrip({ id_trip, id_user }: GetUserStatusInTripRequest) {
  const finalUrl = attendanceListsRoutes.getUserStatusInTrip.url.replace(':id_trip', id_trip).replace(':id_user', id_user)
  const response = await instance.get(finalUrl);

  return response.data;
}
