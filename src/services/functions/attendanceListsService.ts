import { AttendanceListStatus } from "../../constants/enumAttendanceListStatus";
import * as attendanceListsRoutes from "../api/attendanceLists";

export interface GetUserStatusInTripRequest {
  id_trip: string,
  id_user: string
}

export async function getUserStatusInTrip({ id_trip, id_user }: GetUserStatusInTripRequest): Promise<AttendanceListStatus> {
  let res: any;

  try {
    res = await attendanceListsRoutes.getUserStatusInTrip({ id_trip, id_user });
  } catch (error) {
    // TODO
  }

  return res.data;
}