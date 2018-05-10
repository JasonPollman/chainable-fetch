/**
 * A chainable fetch library.
 * @since 5/9/18
 * @file
 */

import _ from 'lodash';
import fp from 'lodash/fp';
import chainable, { chainableGeneratorWithDefaults } from '@jasonpollman/chainable';

// In the browser, this will work with various bundlers like webpack
// using the native browser `fetch` implementation or a polyfill, but
// you'll need to ignore the `node-fetch` library.
// eslint-disable-next-line global-require
const fetch = typeof window !== 'undefined' ? window.fetch : require('node-fetch');

/**
 * Stringifies object only, leaves other values untouched.
 * @param {Object|string} value The value to maybe stringify.
 * @returns {string} The original string input value, or the stringified value.
 */
const maybeStringify = value => (_.isObject(value) ? JSON.stringify(value) : value);

/**
 * Use to omit non-string, non-numeric, and non-object values from querystrings.
 * @param {any} value The value to inspect.
 * @returns {boolean} True if the value is a valid querystring value, false otherwise.
 */
const isOfQueryStringType = value => _.isString(value) || _.isNumber(value) || _.isObject(value);

/**
 * Removes nil values from objects.
 * @function
 */
const withoutNilValues = fp.pickBy(fp.negate(fp.isNil));

/**
 * Converts an object to a querystring.
 * This differs from querystring.stringify in that it stringifies object values.
 * @function
 */
const querystringify = fp.compose(
  fp.join('&'),
  fp.map(fp.join('=')),
  fp.toPairs,
  fp.mapValues(encodeURIComponent),
  fp.mapValues(maybeStringify),
  fp.pickBy(isOfQueryStringType),
);

/**
 * The base headers applied to all requests if the `json` option is enabled.
 * @type {Object<string>}
 */
const JSONHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Formats the HTTP request options by formatting the href to include the query string,
 * uppercasing the method, etc. You can pass additional options that node-fetch supports here
 * (such as 'follow', 'timeout', etc.).
 * @param {Object} options HTTP request options.
 * @returns {Object} The formatted request options.
 */
const formatRequestOptions = ({
  url,
  body,
  json,
  query,
  method,
  headers,
  ...rest
}) => withoutNilValues({
  method: _.toUpper(method),
  href: `${url}${query ? `?${querystringify(query)}` : ''}`,
  body: json ? JSON.stringify(body) : body,
  headers: json ? _.defaults({}, headers, JSONHeaders) : headers,
  ...rest,
});

/**
 * Processes a "non-raw" response.
 * This will consume the response with the desired `responseFormat`.
 * Which is one of: text, json, buffer, blob etc. See node-fetch's
 * body class for more information.
 * @param {Object} response The http response from fetch.
 * @param {Object} options HTTP request options.
 * @returns {Buffer|Object|String} The response in the desired format.
 */
async function consumeResponse(response, { json, format = 'text' }) {
  const method = json ? 'json' : format;
  const deserialize = json ? JSON.parse : _.identity;

  return _.has(response, method)
    ? deserialize(await response[method]())
    : deserialize(await response.text());
}

/**
 * The default response error handler, if none was supplied by the user.
 * @param {Object} request The HTTP request object.
 * @param {Object} response The HTTP response object.
 */
function handleResponseErrors(request, response, { url }) {
  const { status, statusText } = response;
  throw Object.assign(new Error(`Request to ${url} failed: ${status} - ${statusText}`), {
    request,
    response,
  });
}


/**
 * Creates a function that makes an HTTP request
 * using node-fetch and the provided method.
 * @param {string} method The HTTP method this http request method is for.
 * @returns {function} A http request function.
 */
function initiateHttpRequest(method) {
  return async function request(opts = {}) {
    if (!_.isPlainObject(opts)) {
      throw new TypeError('Request options must be a plain object.');
    }

    const options = _.defaults({ url: this.toString(), method }, opts, this.requestOptions, {
      json: true,
    });

    // Pipe the options to the request interceptor, its return value will
    // be used in lieu of the given options. Here you can force headers, etc.
    const interceptor = _.get(options, 'interceptors.request', _.identity);
    const { href, ...fetchOptions } = interceptor(formatRequestOptions(options));

    const response = await fetch(href, fetchOptions);
    if (options.raw) return response;

    const responseInterceptor = _.get(options, 'interceptors.response', _.identity);
    const handleResponseError = _.get(options, 'handleResponseError', handleResponseErrors);

    // If the response is "ok" consume it and pipe it to the response interceptor.
    // If not, invoke the user's `handleResponseError` method.
    return response.ok
      ? responseInterceptor(consumeResponse(response, options), options)
      : handleResponseError(request, response, options);
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
    'delete',
    'option',
  ];

  return chainableGeneratorWithDefaults(
    Object.assign(_.zipObject(methods, _.map(methods, initiateHttpRequest)), {
      separator: '/',
      sanitizeLinks: encodeURIComponent,

      /**
       * A mechanism so users can use keywords like
       * `get` and `post` as path endpoints.
       * @param {string} endpoint The endpoint to push.
       * @returns {Proxy} The chainable child object.
       */
      path: function path(endpoint) {
        return chainable({
          ...this,
          tokens: [...this.tokens, endpoint],
        });
      },
    }),
  );
})();

/**
 * Creates a new chainable fetch api that will make requests to "options.host".
 * The given options will be merged with the defaults from above.
 * @function
 */
export default (options) => {
  const requestOptions = _.isPlainObject(options) ? { ...options } : { host: options };

  // Not using url.parse for browser support.
  // @todo This could be a bit more comprehensive.
  const [, protocol, hostname] = _.get(requestOptions, 'host', '').match(/(https?):\/\/(.*)/) || [];

  if (!protocol || !hostname) {
    throw new TypeError(
      'Host must be a valid url with a protocol and hostname.',
    );
  }

  return chainableFetch({
    prefix: _.replace(requestOptions.host, /\/$/, ''),
    requestOptions,
  });
};
