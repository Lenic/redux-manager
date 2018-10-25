import { createReducer, injectReducer } from '@lenic/redux-manager';

export const key = 'roles';

const FETCH_DATA = `${key}/FETCH_DATA`;
const SET_DATA_LOADING = `${key}/SET_DATA_LOADING`;

export default {
  resetData: () => ({ type: SET_DATA_LOADING }),
  fetchData: api => async dispatch => {
    const token = setTimeout(() => dispatch({
      type: SET_DATA_LOADING,
    }), 200);

    const result = await api();
    clearTimeout(token);

    dispatch({
      type: FETCH_DATA,
      payload: result,
    });
  },
};

const initialState = {
  dataSource: {
    loading: true,
  },
};

const reducers = createReducer(initialState, {
  [SET_DATA_LOADING]: state => ({
    ...state,
    dataSource: {
      ...state.dataSource,
      loading: true,
    },
  }),
  [FETCH_DATA]: (state, data) => ({
    ...state,
    dataSource: {
      ...state.dataSource,
      data,
      loading: false,
    },
  }),
});

injectReducer(key, reducers);
