import { combineReducers } from 'redux-immutable';

import tidbits from './containers/Tidbits/reducer';

export default function createReducer() {
  return combineReducers({
    tidbits
  });
}
