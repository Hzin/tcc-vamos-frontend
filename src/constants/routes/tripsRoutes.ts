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
  cancelTrip: {
    url: `${tripsRoutesDefault}/update/cancel`
  },
  confirmTrip: {
    url: `${tripsRoutesDefault}/update/confirm`
  }
}

export default tripsRoutes;