import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

function configureStore(initialState) {
  const compose = (...middlewares) => {
    let devTools = null;

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require, import/no-unresolved, import/no-extraneous-dependencies
      devTools = require('redux-devtools-extension').composeWithDevTools;
    }

    const appliedMiddlewares = applyMiddleware(...middlewares);

    return devTools ? devTools(appliedMiddlewares) : appliedMiddlewares;
  };

  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      Thunk,
      routerMiddleware(history)
    )
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require, import/no-unresolved
        store.replaceReducer(require('./reducers').default);
      });
    }
  }

  return store;
}

export default configureStore(history);
