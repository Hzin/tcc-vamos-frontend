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
    url: `${transportsRoutesDefault}/contract/request`
  },
  acceptContract: {
    url: `${transportsRoutesDefault}/contract/accept`
  },
  rejectContract: {
    url: `${transportsRoutesDefault}/contract/reject`
  },
  getPassengers: {
    url: `${transportsRoutesDefault}/:id/passengers`
  },
  getPendingContractRequests: {
    url: `${transportsRoutesDefault}/:id/contracts/pending`
  }
}

export default transportsRoutes;