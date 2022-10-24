const tripsRoutesDefault = '/trips';
const tripsRoutes = {
  getTodaysTrips: {
    url: `${tripsRoutesDefault}/feed/today`
  },
  getNotTodaysTrips: {
    url: `${tripsRoutesDefault}/feed/nottoday`
  },
  getTrip: {
    url: `${tripsRoutesDefault}`
  },
  getTripByItineraryId: {
    url: `${tripsRoutesDefault}/itinerary`
  },
  getTodaysTripStatusByItineraryId: {
    url: `${tripsRoutesDefault}/today/status/itinerary`
  },
  cancelTrip: {
    url: `${tripsRoutesDefault}/update/cancel`
  },
  confirmTrip: {
    url: `${tripsRoutesDefault}/update/confirm`
  }
}

export default tripsRoutes;