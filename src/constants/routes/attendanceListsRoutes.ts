const attendanceListsRoutesDefault = '/attendance';
const attendanceListsRoutes = {
    getUserStatusInTrip: {
    url: `${attendanceListsRoutesDefault}/trip/:id_trip/user/:id_user/status`
  },
}

export default attendanceListsRoutes;