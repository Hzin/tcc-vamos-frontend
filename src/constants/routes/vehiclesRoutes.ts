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
  delete: {
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
  getPendingDocuments: {
    url: `${vehiclesRoutesDefault}/documents/pending`
  },
  countVehiclesPendingDocuments: {
    url: `${vehiclesRoutesDefault}/documents/pending/count`
  },

  // urls de picture
  searchPictureFile: {
    url: `${vehiclesRoutesDefault}/picture/search`
  },
  uploadPictureFile: {
    url: `${vehiclesRoutesDefault}/picture/update`
  },
  deletePictureFile: {
    url: `${vehiclesRoutesDefault}/picture/delete`
  },

  canCreateItineraries: {
    url: `${vehiclesRoutesDefault}/can_create_itineraries`
  }
}

export default vehiclesRoutes;