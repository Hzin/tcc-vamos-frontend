const tripsRoutesDefault = '/trips';
const tripsRoutes = {
  getTripsByItineraryId: {
    url: `${tripsRoutesDefault}/itinerary/:id`
  },

  getTodaysTripsAsDriver: {
    url: `${tripsRoutesDefault}/feed/driver/today`
  },
  getNotTodaysTripsAsDriver: {
    url: `${tripsRoutesDefault}/feed/driver/nottoday`
  },
  getTodaysTripsAsPassenger: {
    url: `${tripsRoutesDefault}/feed/passenger/today`
  },
  getNotTodaysTripsAsPassenger: {
    url: `${tripsRoutesDefault}/feed/passenger/nottoday`
  },

  getTrip: {
    url: `${tripsRoutesDefault}`
  },
  getTodaysTripByItineraryId: {
    url: `${tripsRoutesDefault}/today/itinerary/:id`
  },
  getTodaysTripStatusByItineraryId: {
    url: `${tripsRoutesDefault}/today/status/itinerary/:id`
  },
  cancelTrip: {
    url: `${tripsRoutesDefault}/update/cancel`
  },
  confirmTrip: {
    url: `${tripsRoutesDefault}/update/confirm`
  },
  updatePresence: {
    url: `${tripsRoutesDefault}/presence`
  },
  getAttendanceList: {
    url: `${tripsRoutesDefault}/:id/attendance-list`
  },
}

export default tripsRoutes;