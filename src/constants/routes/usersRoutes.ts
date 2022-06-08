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
  getSocialInfo: {
    url: `${usersRoutesDefault}/social`
  }
}

export default usersRoutes;