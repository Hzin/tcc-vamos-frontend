const vehiclesRoutesDefault = '/vehicles';
const vehiclesRoutes = {
  // urls de vehicle
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

  // urls de document
  searchDocumentFile: {
    url: `${vehiclesRoutesDefault}/document/search`
  },
  uploadDocumentFile: {
    url: `${vehiclesRoutesDefault}/document/upload`
  },
  deleteDocumentFile: {
    url: `${vehiclesRoutesDefault}/document/delete`
  },
  updateDocumentStatus: {
    url: `${vehiclesRoutesDefault}/document/status`
  },

  // urls de picture
  searchPictureFile: {
    url: `${vehiclesRoutesDefault}/picture/search`
  },
  uploadPictureFile: {
    url: `${vehiclesRoutesDefault}/picture/upload`
  },
  deletePictureFile: {
    url: `${vehiclesRoutesDefault}/picture/delete`
  },
}

export default vehiclesRoutes;