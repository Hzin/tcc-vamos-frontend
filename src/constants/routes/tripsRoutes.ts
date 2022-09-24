const tripsRoutesDefault = '/trips';
const tripsRoutes = {
  getTodaysTrips: {
    url: `${tripsRoutesDefault}/feed/today`
  },
  getNotTodaysTrips: {
    url: `${tripsRoutesDefault}/feed/nottoday`
  }
}

export default tripsRoutes;