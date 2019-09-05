import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

export default _history =>
  combineReducers({
    router: connectRouter(_history),
    form: formReducer
  });
