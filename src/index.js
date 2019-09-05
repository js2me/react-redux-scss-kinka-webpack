// import 'core-js/modules/es6.promise';
// import 'core-js/modules/es6.weak-map';
// import 'core-js/modules/es6.symbol';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from '@components/common/App';
import store, { history } from '@store';

import '@styles/index.scss';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('why-did-you-update').whyDidYouUpdate(React);
}
