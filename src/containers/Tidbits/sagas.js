import { 
	takeLatest,
	takeEvery,
	select
} from 'redux-saga/effects';
import { 
	FETCH_TIDBITS_REQUEST,
	CREATE_TIDBIT_REQUEST,
	ADD_TAG,
	REMOVE_TAG
 } from './constants';
import { 
	fetchTidbitsSuccess, 
	fetchTidbitsFailure,
	createTidbitSuccess,
	createTidbitFailure,
} from './actions';
import { getTags } from './selectors'
import { apiSaga } from '../../sagas';
import { 
	getTidbits,
	createTidbit,
} from '../../utils/api';

export function* fetchTidbitsFlow() {
  const tags = yield select(getTags)
  yield* apiSaga(getTidbits, [tags.toJS()], fetchTidbitsSuccess, fetchTidbitsFailure);
}

export function* createTidbitFlow({ payload }) {
  yield* apiSaga(createTidbit, [payload], createTidbitSuccess, createTidbitFailure);
}

export default function* watchTidbits() {
  yield [
    takeEvery(FETCH_TIDBITS_REQUEST, fetchTidbitsFlow),
    takeEvery(ADD_TAG, fetchTidbitsFlow),
    takeEvery(REMOVE_TAG, fetchTidbitsFlow),
    takeLatest(CREATE_TIDBIT_REQUEST, createTidbitFlow),
  ];
}
