const passengersRoutesDefault = '/passengers';

const passengersRoutes = {
  getByItineraryId: {
    url: `${passengersRoutesDefault}/itinerary/:id`
  },
}

export default passengersRoutes;