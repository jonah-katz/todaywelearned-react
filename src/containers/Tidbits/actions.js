/*
 *
 * Tidbits actions
 *
 */

import {
  FETCH_TIDBITS_REQUEST,
  FETCH_TIDBITS_SUCCESS,
  FETCH_TIDBITS_FAILURE,
  CREATE_TIDBIT_REQUEST,
  CREATE_TIDBIT_SUCCESS,
  CREATE_TIDBIT_FAILURE,
  ADD_TAG,
  REMOVE_TAG
} from './constants';

export function fetchTidbitsRequest() {
  return {
    type: FETCH_TIDBITS_REQUEST
  };
}

export function fetchTidbitsSuccess(payload) {
  return {
    type: FETCH_TIDBITS_SUCCESS,
    payload: payload
  };
}

export function fetchTidbitsFailure() {
  return {
    type: FETCH_TIDBITS_FAILURE
  };
}

export function createTidbitRequest(payload) {
  return {
    type: CREATE_TIDBIT_REQUEST,
    payload: payload
  };
}

export function createTidbitSuccess(payload) {
  return {
    type: CREATE_TIDBIT_SUCCESS,
    payload: payload
  };
}

export function createTidbitsFailure() {
  return {
    type: CREATE_TIDBIT_FAILURE
  };
}

export function addTag(payload) {
  return {
    type: ADD_TAG,
    payload: payload
  };
}

export function removeTag(payload) {
  return {
    type: REMOVE_TAG,
    payload: payload
  };
}

