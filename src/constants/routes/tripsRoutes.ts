const tripsRoutesDefault = '/trips';
const tripsRoutes = {
  getTripsByItineraryId: {
    url: `${tripsRoutesDefault}/itinerary/:id`
  },

  getFeed: {
    url: `${tripsRoutesDefault}/feed/tripDay/:tripDay/userType/:userType`
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

  createTrip: {
    url: `${tripsRoutesDefault}/tripType/:tripType/update/status/:newStatus`
  },
  updateTripStatus: {
    // url: `${tripsRoutesDefault}/tripType/:tripType/update/status/:newStatus`
    url: `${tripsRoutesDefault}/:id/status/new/:newStatus`
  },
  undoLastStatusChange: {
    url: `${tripsRoutesDefault}/:id/status/undo`
  },
  getTripHistoricData: {
    url: `${tripsRoutesDefault}/:id/status/history`
  },
  updatePresence: {
    url: `${tripsRoutesDefault}/presence`
  },
  getAttendanceList: {
    url: `${tripsRoutesDefault}/:id/attendance-list`
  },
}

export default tripsRoutes;