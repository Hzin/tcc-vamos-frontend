const vansRoutesDefault = '/vans';
const vansRoutes = {
  list: {
    url: `${vansRoutesDefault}/list`
  },
  getByPlate: {
    url: `${vansRoutesDefault}/plate`
  },
  getByUserId: {
    url: `${vansRoutesDefault}/user`
  },
  create: {
    url: `${vansRoutesDefault}/`
  },
  update: {
    url: `${vansRoutesDefault}/`
  }
}

export default vansRoutes;