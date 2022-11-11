const passengersRequestsRoutesDefault = '/passengersrequests';

const passengersRequestsRoutes = {
  getById: {
    url: `${passengersRequestsRoutesDefault}/:id`
  },
  searchByIdUserAndIdItinerary: {
    url: `${passengersRequestsRoutesDefault}/search`
  },
}

export default passengersRequestsRoutes;