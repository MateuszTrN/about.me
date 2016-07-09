import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {asyncReducerCreator} from 'redux-async-toolkit';

import auth from './auth';

export default combineReducers({
  routing: routeReducer,
  data: asyncReducerCreator({
    someData: {
      list: []
    }
  }),
  auth
});
