/**
 * Utility methods.
 * @since 5/10/18
 * @file
 */

import _ from 'lodash';
import fp from 'lodash/fp';

/**
 * Attempts to invoke `method` with `args` and returns
 * `fallback` if an error is thrown.
 * @param {function} method The method to try.
 * @param {any} fallback The fallback value to return.
 * @param {...nany} args The arguments to pass to `method`.
 */
export const tryCatchReturn = (method, fallback, ...args) => {
  try {
    return method(...args);
  } catch (e) {
    return fallback;
  }
};

/**
 * Attempt to execute JSON.parse on value. If JSON.parse fails, value is returned as given.
 * @param {any} value The value to attempt to parse.
 * @returns {any} The input value, or the parsed value.
 */
export const tryJsonParse = value => (
  (_.isString(value) && tryCatchReturn(JSON.parse, value, value)) || value
);

/**
 * Attempt to execute JSON.stringify on value. If JSON.stringify fails, value is returned as given.
 * @param {any} value The value to attempt to stringify.
 * @returns {any} The input value, or the stringified value.
 */
export const tryJsonStringify = value => tryCatchReturn(JSON.stringify, value, value);

/**
 * Stringifies objects only, leaves other values untouched.
 * @param {Object|string} value The value to maybe stringify.
 * @returns {string} The original string input value, or the stringified value.
 */
export const maybeStringify = value => (_.isObject(value) ? JSON.stringify(value) : value);

/**
 * Used to omit non-string, non-numeric, and non-object values from querystrings.
 * @param {any} value The value to inspect.
 * @returns {boolean} True if the value is a valid querystring value, false otherwise.
 */
export const isOfQueryStringType = value => _.isString(value)
  || _.isNumber(value)
  || _.isArray(value)
  || _.isPlainObject(value);

/**
 * Removes nil values from objects.
 * @function
 */
export const withoutNilValues = fp.pickBy(fp.negate(fp.isNil));

/**
 * Gets the hostname from an object and sanitizes it for use with [node-]fetch.
 * @function
 */
export const getSanitizedHostname = fp.compose(
  fp.replace(/\/+$/, ''),
  fp.trim,
  fp.getOr('', 'host'),
  fp.identity,
);

/**
 * Converts an object to a querystring.
 * This differs from querystring.stringify in that it
 * automatically JSON.stringify's object values.
 * @function
 */
export const querystringify = fp.compose(
  querystring => (querystring ? `?${querystring}` : ''),
  fp.join('&'),
  fp.map(fp.join('=')),
  fp.toPairs,
  fp.mapValues(encodeURIComponent),
  fp.mapValues(maybeStringify),
  fp.pickBy(isOfQueryStringType),
  fp.identity,
);
