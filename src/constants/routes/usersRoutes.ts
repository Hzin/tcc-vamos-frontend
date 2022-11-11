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
  checkIfUserIsAdmin: {
    url: `${usersRoutesDefault}/admin/check`
  },
}

export default usersRoutes;