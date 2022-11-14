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
  updateTripStatus: {
    url: `${tripsRoutesDefault}/tripType/:tripType/update/status/:newStatus`
  }
}

export default tripsRoutes;