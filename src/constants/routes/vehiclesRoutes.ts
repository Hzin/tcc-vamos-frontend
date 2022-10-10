const vehiclesRoutesDefault = '/vehicles';
const vehiclesRoutes = {
  list: {
    url: `${vehiclesRoutesDefault}/list`
  },
  getByPlate: {
    url: `${vehiclesRoutesDefault}/plate`
  },
  getByUserId: {
    url: `${vehiclesRoutesDefault}/user`
  },
  create: {
    url: `${vehiclesRoutesDefault}/`
  },
  update: {
    url: `${vehiclesRoutesDefault}/`
  }
}

export default vehiclesRoutes;