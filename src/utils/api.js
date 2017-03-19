import request from './request';

/**
 * Network request with appropriate headers for the JSON API
 *
 * @param  {string} uri    A URI to a requested resource
 * @param  {object} [opts] Additional options for body and HTTP method
 *
 * @return {function}    Call to `request/2`
 */
export const unauthedRequest =
  (uri, opts = {}) => request(uri, {
    headers: {
      'Accept': 'application/vnd.todaywelearned.v1+json',
      'Content-Type': 'application/json',
    },
    ...opts,
  });

/**
 * Network request with appropriate headers for the JSON API
 *
 * @param  {string} uri       A URI to a requested resource
 * @param  {string} authToken A token used by the API to id requestor
 * @param  {object} [opts]    Additional options for body and HTTP method
 *
 * @return {function}         Call to `request/2`
 */
export const authedRequest =
  (uri, authToken, opts = {}) => request(uri, {
    headers: {
      'Accept': 'application/vnd.todaywelearned.v1+json',
      'Content-Type': 'application/json',
      'Authorization': `Token token=${authToken}`,
    },
    ...opts,
  });

/**
 *
 * /tidbits resource requests
 *
 */
export const getTidbits =
  (payload) => unauthedRequest('tidbits?tags=' + payload.join(','))



/**
 *
 * /tidbits resource requests
 *
 */

export const createTidbit =
  (payload) => unauthedRequest('tidbits', {
      method: 'POST',
      body: JSON.stringify({
        tidbit: payload
      })
    })


