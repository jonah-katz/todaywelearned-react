import expect from 'expect';
import tidbitsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('tidbitsReducer', () => {
  it('returns the initial state', () => {
    expect(tidbitsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
