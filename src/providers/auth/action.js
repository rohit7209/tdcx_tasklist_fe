const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const loginAction = (payload) => ({ type: types.LOGIN, payload });
const logoutAction = (payload) => ({ type: types.LOGOUT, payload });

export {
  loginAction,
  logoutAction,
  types,
};
