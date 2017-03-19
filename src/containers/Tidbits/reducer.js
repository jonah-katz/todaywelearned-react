/*
 *
 * Tidbits reducer
 *
 */

import { fromJS } from 'immutable';
import {
  FETCH_TIDBITS_REQUEST,
  FETCH_TIDBITS_SUCCESS,
  CREATE_TIDBIT_REQUEST,
  CREATE_TIDBIT_SUCCESS,
  ADD_TAG,
  REMOVE_TAG
} from './constants';


const initialState = fromJS({
  allTidbits: [],
  isFetching: false,
  isCreating: false,
  activeTags: []
});


function tidbitReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TIDBITS_REQUEST:
      return state.set('isFetching', true);
    case FETCH_TIDBITS_SUCCESS:
      return state.merge({
        isFetching: false,
        allTidbits: action.payload.reduce((cs, c) => {
          cs[c.id] = c;
          return cs;
        }, {}),
      });
    case CREATE_TIDBIT_REQUEST:
      return state.set('isCreating', true);
    case CREATE_TIDBIT_SUCCESS:
      return state.merge({
          allTidbits: state.get('allTidbits').merge({
            [action.payload.id]: action.payload
          })
      });
    case ADD_TAG:
      if(state.get('activeTags').indexOf(action.payload) > -1) {return state}
      return state.merge({
        activeTags: [...state.get('activeTags'), action.payload],
        isFetching: true
      })
    case REMOVE_TAG:
      return state.merge({
        activeTags: state.get('activeTags').filter((t) => t !== action.payload),
        isFetching: true
      })
    default:
      return state;
  }
}

export default tidbitReducer;
