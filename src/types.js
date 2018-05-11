/**
 * Stores/defines the various request types.
 * @since 5/10/18
 */

import _ from 'lodash';

import {
  tryJsonParse,
  tryJsonStringify,
} from './utils';

/**
 * Stores the various predefined request types.
 * @type {Map}
 */
export const requestTypes = new Map();

/**
 * Creates a new request type.
 * @param {Object} options Request type definition options.
 * @returns {undefined}
 * @export
 */
export function setRequestType(options) {
  if (!_.isPlainObject(options)) {
    throw new TypeError('Request type definition must be a plain object.');
  }

  if (!_.isString(options.name)) {
    throw new TypeError('Request type property `name` must be a string.');
  }

  if (!_.isFunction(options.serialize)) {
    throw new TypeError('Request type property `serialize` must be a function.');
  }

  if (!_.isFunction(options.deserialize)) {
    throw new TypeError('Request type property `deserialize` must be a function.');
  }

  requestTypes.set(options.name, { headers: {}, ...options });
}

/**
 * Predefined "built-in" request types.
 * @type {Array<object>}
 */
const types = [
  {
    name: 'json',
    serialize: tryJsonStringify,
    deserialize: tryJsonParse,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  {
    name: 'text',
    serialize: _.identity,
    deserialize: _.identity,
  },
  {
    name: 'blob',
    serialize: _.identity,
    deserialize: _.identity,
  },
  {
    name: 'buffer',
    serialize: _.identity,
    deserialize: _.identity,
  },
];

_.each(types, setRequestType);
