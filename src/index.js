import React from 'react';
import thunk from 'redux-thunk';
import { connect as originalConnect } from 'react-redux';
import {
  applyMiddleware,
  compose,
  createStore as createOriginslStore,
  combineReducers,
} from 'redux';

let rootStore = null;

export const injectReducer = (key, reducer) => {
  if (!rootStore) {
    throw new Error('The store must be initialized first.');
  }

  if (rootStore.asyncReducers.hasOwnProperty(key)) {
    return;
  }

  rootStore.asyncReducers[key] = reducer;
  rootStore.replaceReducer(combineReducers(rootStore.asyncReducers));
};

export const createReducer = (initialState, reducers) => (state = initialState, action) => {
  const handler = reducers[action.type];
  return handler ? handler(state, action.payload) : state;
};

export const createStore = (initialReducer = {}) => {
  const middlewares = [thunk];

  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createOriginslStore(
    combineReducers(initialReducer),
    {},
    compose(
      applyMiddleware(...middlewares),
      ...enhancers,
    ),
  );

  store.asyncReducers = {
    ...initialReducer,
  };
  rootStore = store;

  return store;
};

export const asyncSet = Component => {
  class SubComponent extends Component {
    constructor(props, context) {
      super(props, context);

      this.$isUnmount = false;

      const originalSetState = this.setState;
      this.setState = (...args) => {
        if (this.$isUnmount) {
          return;
        }

        originalSetState.apply(this, args);
      };
    }

    componentWillUnmount() {
      this.$isUnmount = true;

      super.componentWillUnmount && super.componentWillUnmount();
    }
  }

  return SubComponent;
};

export const connect = (mapStateToProps, actions) => Component =>
  originalConnect(mapStateToProps, actions)(asyncSet(Component));

export const linkStyle = style => Component => {
  class SubComponent extends Component {
    constructor(props, context) {
      super(props, context);

      style.use();
    }

    componentWillUnmount() {
      style.unuse();

      super.componentWillUnmount && super.componentWillUnmount();
    }
  }

  return SubComponent;
};
