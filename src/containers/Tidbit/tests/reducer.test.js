import expect from 'expect';
import tidbitReducer from '../reducer';
import { fromJS } from 'immutable';

describe('tidbitReducer', () => {
  it('returns the initial state', () => {
    expect(tidbitReducer(undefined, {})).toEqual(fromJS({}));
  });
});
