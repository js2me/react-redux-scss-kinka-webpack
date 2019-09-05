import pMinDelay from 'p-min-delay';
import loadable from '@loadable/component';

const MINIMUM_DELAY = 50;

const delay = promise => pMinDelay(promise, MINIMUM_DELAY);

const routes = {
  feed: {
    path: '/feed',
    component: loadable(() => delay(import('@components/pages/Feed')))
  },
  refresh: {
    path: '/refresh',
    component: ({ history, location, match }) => {
      history.replace({
        ...location,
        pathname: location.pathname.substring(match.path.length)
      });
      return null;
    }
  }
};

export default routes;
