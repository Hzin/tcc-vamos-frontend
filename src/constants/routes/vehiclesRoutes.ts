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
  },
  searchFile: {
    url: `${vehiclesRoutesDefault}/document/search`
  },
  uploadFile: {
    url: `${vehiclesRoutesDefault}/document/upload`
  },
  deleteFile: {
    url: `${vehiclesRoutesDefault}/document/delete`
  },
  updateDocumentStatus: {
    url: `${vehiclesRoutesDefault}/document/status`
  }
}

export default vehiclesRoutes;