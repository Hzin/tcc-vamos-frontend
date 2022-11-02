const transportsRoutesDefault = '/itineraries';
const transportsRoutes = {
  create: {
    url: `${transportsRoutesDefault}`
  },
  get: {
    url: `${transportsRoutesDefault}`
  },
  search: {
    url: `${transportsRoutesDefault}/search/inradius`
  },
  update: {
    url: `${transportsRoutesDefault}`
  },
  request: {
    url: `${transportsRoutesDefault}/request`
  },

  getById: {
    url: `${transportsRoutesDefault}`
  }
}

export default transportsRoutes;