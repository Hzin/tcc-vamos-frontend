const vehiclesRoutesDefault = '/vehicles/locator';
const vehiclesRoutes = {
  list: {
    url: `${vehiclesRoutesDefault}/list`
  },
  getById: {
    url: `${vehiclesRoutesDefault}/`
  },
  create: {
    url: `${vehiclesRoutesDefault}/`
  },
  update: {
    url: `${vehiclesRoutesDefault}/edit`
  }
}

export default vehiclesRoutes;