import { fork, put, call } from 'redux-saga/effects';

export function* apiSaga(fn, args, successAction, failureAction) {
  try {
    const response = yield call(fn, ...args);
    yield put(successAction(response));
  } catch(error) {
    yield put(failureAction(error));
  }
}

export function* authedApiSaga(fn, args, successAction, failureAction) {
  const token = ''
  yield* apiSaga(fn, [token, ...args], successAction, failureAction);
}

// Collect Sagas and fork from containers
import tidbitsSaga from './containers/Tidbits/sagas';

export default function* root() {
  yield [
    fork(tidbitsSaga),
  ];
}
