import { map } from 'lodash-es';
import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import routes from '@routes';

import styles from './styles.scss';

const App = () => (
  <div className={styles.wrapper}>
    <Switch>
      <Route exact path="/" render={() => <Redirect to={routes.feed.path} />} />
      {map(routes, ({ exact, path, component }) => (
        <Route exact={exact} path={path} component={component} />
      ))}
    </Switch>
  </div>
);

const container = withRouter(App);

let withHotUpdate = null;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-unresolved, import/no-extraneous-dependencies
  withHotUpdate = require('react-hot-loader').hot;
}

export default withHotUpdate ? withHotUpdate(module)(container) : container;
