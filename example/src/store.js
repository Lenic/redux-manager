import _ from 'underscore';
import { createReducer, createStore } from '@lenic/redux-manager';

export const key = 'global';

const LOGIN_SYSTEM = `${key}/LOGIN_SYSTEM`;
const LOGOUT_SYSTEM = `${key}/LOGOUT_SYSTEM`;

export default {
  login: v => ({
    type: LOGIN_SYSTEM,
    payload: v,
  }),
  logout: () => ({ type: LOGOUT_SYSTEM }),
};

const initialStateFn = () => ({
  user: null,
  permissions: {},
});

const reducers = createReducer(initialStateFn(), {
  [LOGIN_SYSTEM]: (state, v) => ({
    ...state,
    user: v.user,
    permissions: _.chain(v.permissions)
      .map(v => [v, 1])
      .object()
      .value(),
  }),
  [LOGOUT_SYSTEM]: () => initialStateFn(),
});

export const store = createStore({ [key]: reducers });
