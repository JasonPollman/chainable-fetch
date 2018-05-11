/**
 * A chainable fetch library.
 * @since 5/9/18
 * @file
 */

import _ from 'lodash';
import chainable, { chainableGeneratorWithDefaults } from '@jasonpollman/chainable';
import { requestTypes } from './types';

import {
  querystringify,
  getSanitizedHostname,
  withoutNilValues,
} from './utils';

// Exposing this so users can define their own request types.
export { setRequestType } from './types';

// In the browser, this will work with various bundlers like webpack
// using the native browser `fetch` implementation or a polyfill, but
// you'll need to ignore the `node-fetch` library.
// eslint-disable-next-line global-require
const fetch = typeof window !== 'undefined'
  /* istanbul ignore next: testing occurrs in node */
  ? window.fetch
  : require('node-fetch');

/**
 * Formats the HTTP request options by adding the query string to the base url,
 * uppercasing the method, etc. You can pass additional options that [node-]fetch supports here
 * (such as 'follow', 'timeout', etc.).
 * @param {Object} options HTTP request options.
 * @returns {Object} The formatted request options.
 */
const formatHttpOptions = ({
  url,
  type,
  body,
  query,
  method,
  headers,
  ...rest
}) => withoutNilValues({
  type,
  query,
  href: `${url}${querystringify(query)}`,
  body: body && type.serialize(body),
  method: _.toUpper(method),
  headers: _.defaults({}, headers, type.headers),
  ...rest,
});

/**
 * Processes a "non-raw" response.
 * This will consume the response with the desired response `type`.
 * @param {Object} response The http response from fetch.
 * @param {Object} options HTTP request options.
 * @returns {Buffer|Object|string} The response in the desired format.
 */
async function consumeResponse(response, { type }) {
  const method = _.isFunction(response[type.name]) ? type.name : 'text';
  return type.deserialize(await response[method]());
}

/**
 * The default response error handler (if none was supplied by the user).
 * @param {Object} response The HTTP response object.
 * @param {Object} request The HTTP request options.
 */
function defaultErrorHandler(request, response) {
  const {
    status,
    statusText,
  } = response;

  throw Object.assign(new Error(`Request to ${request.href} failed: [${status}] ${statusText}`), {
    request,
    response,
  });
}

/**
 * Gets the request type from the pre-defined request types.
 * @param {Object} options HTTP request options.
 * @returns {Object} The request type definition object.
 */
function getRequestType({ type = 'json' }) {
  if (!requestTypes.has(type)) throw new Error(`Invalid request type "${type}"`);
  return requestTypes.get(type);
}

/**
 * Creates a function that makes an HTTP request using fetch and the provided method.
 * @param {string} method The HTTP method this http request method is for.
 * @returns {function} A http request function.
 */
function httpRequestorForMethod(method) {
  return async function request(input = {}) {
    if (!_.isPlainObject(input)) {
      throw new TypeError('Request options must be a plain object.');
    }

    const base = {
      url: this.toString(),
      type: getRequestType(input),
      method,
    };

    const options = _.defaults(base, input, this.httpOptions, { fetch });

    // Pipe the options to the request interceptor, its return value will
    // be used in lieu of the given options. Here you can force headers, etc.
    const interceptor = _.get(options, 'interceptors.request', _.identity);
    const formattedOptions = await interceptor(formatHttpOptions(options));

    const response = await options.fetch(formattedOptions.href, formattedOptions);
    if (options.raw) return response;

    const responseInterceptor = _.get(options, 'interceptors.response', _.identity);
    const handleResponseError = _.get(options, 'handleResponseError', defaultErrorHandler);

    // If the response is "ok" consume it and pipe it to the response interceptor.
    // If not, invoke the user's `handleResponseError` method.
    return response.ok
      ? responseInterceptor(await consumeResponse(response, options), formattedOptions, response)
      : handleResponseError(formattedOptions, response);
  };
}

/**
 * Creates a "base" chainable object for use with chainable-fetch.
 * @type {Object}
 */
const chainableFetch = (() => {
  const methods = [
    'get',
    'put',
    'post',
    'patch',
    'head',
    'delete',
  ];

  const requestors = _.zipObject(methods, _.map(methods, httpRequestorForMethod));
  return chainableGeneratorWithDefaults(Object.assign(requestors, {
    separator: '/',

    /**
     * A mechanism so users can use keywords like
     * `get` and `post` as path endpoints.
     * @param {string} endpoint The endpoint to push.
     * @returns {Proxy} The chainable child object.
     */
    path: function path(endpoint) {
      if (!_.isString(endpoint) && !_.isNumber(endpoint)) {
        throw new TypeError('Path endpoint must be a string or numeric value.');
      }

      return chainable({
        ...this,
        tokens: [...this.tokens, endpoint],
      });
    },
  }));
})();

/**
 * Creates a new chainable fetch api that will make requests to "options.host".
 * The given options will be merged with the defaults from above and a chainable
 * proxy object will be returned.
 * @function
 */
export default (options) => {
  const httpOptions = _.isPlainObject(options) ? { ...options } : { host: options };
  const host = getSanitizedHostname(httpOptions);

  if (!/^https?:\/\/.+/.test(host)) {
    throw new TypeError('Host must be a valid url with a protocol and hostname.');
  }

  return chainableFetch({
    prefix: host,
    httpOptions,
  });
};
