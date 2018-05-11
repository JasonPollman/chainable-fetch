'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.requestTypes = undefined;var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _map = require('babel-runtime/core-js/map');var _map2 = _interopRequireDefault(_map);var _each2 = require('lodash/each');var _each3 = _interopRequireDefault(_each2);var _identity2 = require('lodash/identity');var _identity3 = _interopRequireDefault(_identity2);var _isFunction2 = require('lodash/isFunction');var _isFunction3 = _interopRequireDefault(_isFunction2);var _isString2 = require('lodash/isString');var _isString3 = _interopRequireDefault(_isString2);var _isPlainObject2 = require('lodash/isPlainObject');var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);exports.























setRequestType = setRequestType;var _utils = require('./utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                               * Stores the various predefined request types.
                                                                                                                                                               * @type {Map}
                                                                                                                                                               */var requestTypes = exports.requestTypes = new _map2.default(); /**
                                                                                                                                                                                                                                 * Creates a new request type.
                                                                                                                                                                                                                                 * @param {Object} options Request type definition options.
                                                                                                                                                                                                                                 * @returns {undefined}
                                                                                                                                                                                                                                 * @export
                                                                                                                                                                                                                                 */ /**
                                                                                                                                                                                                                                     * Stores/defines the various request types.
                                                                                                                                                                                                                                     * @since 5/10/18
                                                                                                                                                                                                                                     */function setRequestType(options) {if (!(0, _isPlainObject3.default)(options)) {throw new TypeError('Request type definition must be a plain object.');}if (!(0, _isString3.default)(options.name)) {throw new TypeError('Request type property `name` must be a string.');}if (!(0, _isFunction3.default)(options.serialize)) {throw new TypeError('Request type property `serialize` must be a function.');}

  if (!(0, _isFunction3.default)(options.deserialize)) {
    throw new TypeError('Request type property `deserialize` must be a function.');
  }

  requestTypes.set(options.name, (0, _extends3.default)({ headers: {} }, options));
}

/**
   * Predefined "built-in" request types.
   * @type {Array<object>}
   */
var types = [
{
  name: 'json',
  serialize: _utils.tryJsonStringify,
  deserialize: _utils.tryJsonParse,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json' } },


{
  name: 'text',
  serialize: _identity3.default,
  deserialize: _identity3.default },

{
  name: 'blob',
  serialize: _identity3.default,
  deserialize: _identity3.default },

{
  name: 'buffer',
  serialize: _identity3.default,
  deserialize: _identity3.default }];



(0, _each3.default)(types, setRequestType);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90eXBlcy5qcyJdLCJuYW1lcyI6WyJzZXRSZXF1ZXN0VHlwZSIsInJlcXVlc3RUeXBlcyIsIm9wdGlvbnMiLCJUeXBlRXJyb3IiLCJuYW1lIiwic2VyaWFsaXplIiwiZGVzZXJpYWxpemUiLCJzZXQiLCJoZWFkZXJzIiwidHlwZXMiLCJ0cnlKc29uU3RyaW5naWZ5IiwidHJ5SnNvblBhcnNlIiwiQWNjZXB0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QmdCQSxjLEdBQUFBLGMsQ0FqQmhCLGdDLDhGQUtBOzs7aUtBSU8sSUFBTUMsc0NBQWUsbUJBQXJCLEMsQ0FFUDs7Ozs7b09BbEJBOzs7dU9Bd0JPLFNBQVNELGNBQVQsQ0FBd0JFLE9BQXhCLEVBQWlDLENBQ3RDLElBQUksQ0FBQyw2QkFBZ0JBLE9BQWhCLENBQUwsRUFBK0IsQ0FDN0IsTUFBTSxJQUFJQyxTQUFKLENBQWMsaURBQWQsQ0FBTixDQUNELENBRUQsSUFBSSxDQUFDLHdCQUFXRCxRQUFRRSxJQUFuQixDQUFMLEVBQStCLENBQzdCLE1BQU0sSUFBSUQsU0FBSixDQUFjLGdEQUFkLENBQU4sQ0FDRCxDQUVELElBQUksQ0FBQywwQkFBYUQsUUFBUUcsU0FBckIsQ0FBTCxFQUFzQyxDQUNwQyxNQUFNLElBQUlGLFNBQUosQ0FBYyx1REFBZCxDQUFOLENBQ0Q7O0FBRUQsTUFBSSxDQUFDLDBCQUFhRCxRQUFRSSxXQUFyQixDQUFMLEVBQXdDO0FBQ3RDLFVBQU0sSUFBSUgsU0FBSixDQUFjLHlEQUFkLENBQU47QUFDRDs7QUFFREYsZUFBYU0sR0FBYixDQUFpQkwsUUFBUUUsSUFBekIsMkJBQWlDSSxTQUFTLEVBQTFDLElBQWlETixPQUFqRDtBQUNEOztBQUVEOzs7O0FBSUEsSUFBTU8sUUFBUTtBQUNaO0FBQ0VMLFFBQU0sTUFEUjtBQUVFQyxhQUFXSyx1QkFGYjtBQUdFSixlQUFhSyxtQkFIZjtBQUlFSCxXQUFTO0FBQ1BJLFlBQVEsa0JBREQ7QUFFUCxvQkFBZ0Isa0JBRlQsRUFKWCxFQURZOzs7QUFVWjtBQUNFUixRQUFNLE1BRFI7QUFFRUMsK0JBRkY7QUFHRUMsaUNBSEYsRUFWWTs7QUFlWjtBQUNFRixRQUFNLE1BRFI7QUFFRUMsK0JBRkY7QUFHRUMsaUNBSEYsRUFmWTs7QUFvQlo7QUFDRUYsUUFBTSxRQURSO0FBRUVDLCtCQUZGO0FBR0VDLGlDQUhGLEVBcEJZLENBQWQ7Ozs7QUEyQkEsb0JBQU9HLEtBQVAsRUFBY1QsY0FBZCIsImZpbGUiOiJ0eXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogU3RvcmVzL2RlZmluZXMgdGhlIHZhcmlvdXMgcmVxdWVzdCB0eXBlcy5cbiAqIEBzaW5jZSA1LzEwLzE4XG4gKi9cblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHtcbiAgdHJ5SnNvblBhcnNlLFxuICB0cnlKc29uU3RyaW5naWZ5LFxufSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBTdG9yZXMgdGhlIHZhcmlvdXMgcHJlZGVmaW5lZCByZXF1ZXN0IHR5cGVzLlxuICogQHR5cGUge01hcH1cbiAqL1xuZXhwb3J0IGNvbnN0IHJlcXVlc3RUeXBlcyA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHJlcXVlc3QgdHlwZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFJlcXVlc3QgdHlwZSBkZWZpbml0aW9uIG9wdGlvbnMuXG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICogQGV4cG9ydFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0UmVxdWVzdFR5cGUob3B0aW9ucykge1xuICBpZiAoIV8uaXNQbGFpbk9iamVjdChvcHRpb25zKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVlc3QgdHlwZSBkZWZpbml0aW9uIG11c3QgYmUgYSBwbGFpbiBvYmplY3QuJyk7XG4gIH1cblxuICBpZiAoIV8uaXNTdHJpbmcob3B0aW9ucy5uYW1lKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVlc3QgdHlwZSBwcm9wZXJ0eSBgbmFtZWAgbXVzdCBiZSBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIGlmICghXy5pc0Z1bmN0aW9uKG9wdGlvbnMuc2VyaWFsaXplKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVlc3QgdHlwZSBwcm9wZXJ0eSBgc2VyaWFsaXplYCBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICBpZiAoIV8uaXNGdW5jdGlvbihvcHRpb25zLmRlc2VyaWFsaXplKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlcXVlc3QgdHlwZSBwcm9wZXJ0eSBgZGVzZXJpYWxpemVgIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHJlcXVlc3RUeXBlcy5zZXQob3B0aW9ucy5uYW1lLCB7IGhlYWRlcnM6IHt9LCAuLi5vcHRpb25zIH0pO1xufVxuXG4vKipcbiAqIFByZWRlZmluZWQgXCJidWlsdC1pblwiIHJlcXVlc3QgdHlwZXMuXG4gKiBAdHlwZSB7QXJyYXk8b2JqZWN0Pn1cbiAqL1xuY29uc3QgdHlwZXMgPSBbXG4gIHtcbiAgICBuYW1lOiAnanNvbicsXG4gICAgc2VyaWFsaXplOiB0cnlKc29uU3RyaW5naWZ5LFxuICAgIGRlc2VyaWFsaXplOiB0cnlKc29uUGFyc2UsXG4gICAgaGVhZGVyczoge1xuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBuYW1lOiAndGV4dCcsXG4gICAgc2VyaWFsaXplOiBfLmlkZW50aXR5LFxuICAgIGRlc2VyaWFsaXplOiBfLmlkZW50aXR5LFxuICB9LFxuICB7XG4gICAgbmFtZTogJ2Jsb2InLFxuICAgIHNlcmlhbGl6ZTogXy5pZGVudGl0eSxcbiAgICBkZXNlcmlhbGl6ZTogXy5pZGVudGl0eSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdidWZmZXInLFxuICAgIHNlcmlhbGl6ZTogXy5pZGVudGl0eSxcbiAgICBkZXNlcmlhbGl6ZTogXy5pZGVudGl0eSxcbiAgfSxcbl07XG5cbl8uZWFjaCh0eXBlcywgc2V0UmVxdWVzdFR5cGUpO1xuIl19