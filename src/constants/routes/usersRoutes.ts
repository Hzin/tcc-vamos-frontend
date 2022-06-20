const usersRoutesDefault = '/users';
const usersRoutes = {
  create: {
    url: `${usersRoutesDefault}`
  },
  get: {
    url: `${usersRoutesDefault}`
  },
  update: {
    url: `${usersRoutesDefault}/edit`
  },
  checkIfUserIsDriver: {
    url: `${usersRoutesDefault}/isDriver`
  },
  getSocialInfo: {
    url: `${usersRoutesDefault}/social`
  },
  // TODO, depois corrigir
  getUsersSearching: {
    url: `/search/inraio`
  }
}

export default usersRoutes;