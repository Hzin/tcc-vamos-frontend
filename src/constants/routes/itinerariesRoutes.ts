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

  getById: {
    url: `${transportsRoutesDefault}`
  },

  // rotas de contrato
  createContractRequest: {
    url: `${transportsRoutesDefault}/contract/:id`
  },
  updateContractStatus: {
    url: `${transportsRoutesDefault}/contract/status`
  },
  getPassengers: {
    url: `${transportsRoutesDefault}/:id/passengers`
  },
  getPendingContractRequests: {
    url: `${transportsRoutesDefault}/:id/contracts/pending`
  }
}

export default transportsRoutes;