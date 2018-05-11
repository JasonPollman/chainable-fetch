'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.setRequestType = undefined;var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _extends2 = require('babel-runtime/helpers/extends');var _extends3 = _interopRequireDefault(_extends2);var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);var _isNumber2 = require('lodash/isNumber');var _isNumber3 = _interopRequireDefault(_isNumber2);var _isString2 = require('lodash/isString');var _isString3 = _interopRequireDefault(_isString2);var _map2 = require('lodash/map');var _map3 = _interopRequireDefault(_map2);var _zipObject2 = require('lodash/zipObject');var _zipObject3 = _interopRequireDefault(_zipObject2);var _identity2 = require('lodash/identity');var _identity3 = _interopRequireDefault(_identity2);var _get2 = require('lodash/get');var _get3 = _interopRequireDefault(_get2);var _isPlainObject2 = require('lodash/isPlainObject');var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);var _isFunction2 = require('lodash/isFunction');var _isFunction3 = _interopRequireDefault(_isFunction2);var _defaults2 = require('lodash/defaults');var _defaults3 = _interopRequireDefault(_defaults2);var _toUpper2 = require('lodash/toUpper');var _toUpper3 = _interopRequireDefault(_toUpper2);




















































/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * Processes a "non-raw" response.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * This will consume the response with the desired response `type`.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @param {Object} response The http response from fetch.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @param {Object} options HTTP request options.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         * @returns {Buffer|Object|string} The response in the desired format.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         */var consumeResponse = function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(
  function _callee(response, _ref2) {var type = _ref2.type;var method;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            method = (0, _isFunction3.default)(response[type.name]) ? type.name : 'text';_context.t0 =
            type;_context.next = 4;return response[method]();case 4:_context.t1 = _context.sent;return _context.abrupt('return', _context.t0.deserialize.call(_context.t0, _context.t1));case 6:case 'end':return _context.stop();}}}, _callee, this);}));return function consumeResponse(_x, _x2) {return _ref3.apply(this, arguments);};}();


/**
                                                                                                                                                                                                                                                                                                                                                * The default response error handler (if none was supplied by the user).
                                                                                                                                                                                                                                                                                                                                                * @param {Object} response The HTTP response object.
                                                                                                                                                                                                                                                                                                                                                * @param {Object} request The HTTP request options.
                                                                                                                                                                                                                                                                                                                                                */var _types = require('./types');Object.defineProperty(exports, 'setRequestType', { enumerable: true, get: function get() {return _types.setRequestType;} });var _chainable = require('@jasonpollman/chainable');var _chainable2 = _interopRequireDefault(_chainable);var _utils = require('./utils');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // In the browser, this will work with various bundlers like webpack
// using the native browser `fetch` implementation or a polyfill, but
// you'll need to ignore the `node-fetch` library.
// eslint-disable-next-line global-require
var fetch = typeof window !== 'undefined' /* istanbul ignore next: testing occurrs in node */ ? window.fetch : require('node-fetch'); /**
                                                                                                                                       * Formats the HTTP request options by adding the query string to the base url,
                                                                                                                                       * uppercasing the method, etc. You can pass additional options that [node-]fetch supports here
                                                                                                                                       * (such as 'follow', 'timeout', etc.).
                                                                                                                                       * @param {Object} options HTTP request options.
                                                                                                                                       * @returns {Object} The formatted request options.
                                                                                                                                       */var formatHttpOptions = function formatHttpOptions(_ref) {var url = _ref.url,type = _ref.type,body = _ref.body,query = _ref.query,method = _ref.method,headers = _ref.headers,rest = (0, _objectWithoutProperties3.default)(_ref, ['url', 'type', 'body', 'query', 'method', 'headers']);return (0, _utils.withoutNilValues)((0, _extends3.default)({ type: type, query: query, href: '' + url + (0, _utils.querystringify)(query), body: body && type.serialize(body), method: (0, _toUpper3.default)(method), headers: (0, _defaults3.default)({}, headers, type.headers) }, rest));};function defaultErrorHandler(request, response) {var status = response.status,statusText = response.statusText;throw (0, _assign2.default)(new Error('Request to ' + request.href + ' failed: [' + status + '] ' + statusText), { request: request, response: response });
}

/**
   * Gets the request type from the pre-defined request types.
   * @param {Object} options HTTP request options.
   * @returns {Object} The request type definition object.
   */
function getRequestType(_ref4) {var _ref4$type = _ref4.type,type = _ref4$type === undefined ? 'json' : _ref4$type;
  if (!_types.requestTypes.has(type)) throw new Error('Invalid request type "' + type + '"');
  return _types.requestTypes.get(type);
}

/**
   * Creates a function that makes an HTTP request using fetch and the provided method.
   * @param {string} method The HTTP method this http request method is for.
   * @returns {function} A http request function.
   */
function httpRequestorForMethod(method) {
  return function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var base, options, interceptor, formattedOptions, response, responseInterceptor, handleResponseError;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (
              (0, _isPlainObject3.default)(input)) {_context2.next = 2;break;}throw (
                new TypeError('Request options must be a plain object.'));case 2:


              base = {
                url: this.toString(),
                type: getRequestType(input),
                method: method };


              options = (0, _defaults3.default)(base, input, this.httpOptions, { fetch: fetch });

              // Pipe the options to the request interceptor, its return value will
              // be used in lieu of the given options. Here you can force headers, etc.
              interceptor = (0, _get3.default)(options, 'interceptors.request', _identity3.default);_context2.next = 7;return (
                interceptor(formatHttpOptions(options)));case 7:formattedOptions = _context2.sent;_context2.next = 10;return (

                options.fetch(formattedOptions.href, formattedOptions));case 10:response = _context2.sent;if (!
              options.raw) {_context2.next = 13;break;}return _context2.abrupt('return', response);case 13:

              responseInterceptor = (0, _get3.default)(options, 'interceptors.response', _identity3.default);
              handleResponseError = (0, _get3.default)(options, 'handleResponseError', defaultErrorHandler);

              // If the response is "ok" consume it and pipe it to the response interceptor.
              // If not, invoke the user's `handleResponseError` method.
              if (!response.ok) {_context2.next = 25;break;}_context2.t1 =
              responseInterceptor;_context2.next = 19;return consumeResponse(response, options);case 19:_context2.t2 = _context2.sent;_context2.t3 = formattedOptions;_context2.t4 = response;_context2.t0 = (0, _context2.t1)(_context2.t2, _context2.t3, _context2.t4);_context2.next = 26;break;case 25:_context2.t0 =
              handleResponseError(formattedOptions, response);case 26:return _context2.abrupt('return', _context2.t0);case 27:case 'end':return _context2.stop();}}}, _callee2, this);}));function request() {return _ref5.apply(this, arguments);}return request;}();

}

/**
   * Creates a "base" chainable object for use with chainable-fetch.
   * @type {Object}
   */
var chainableFetch = function () {
  var methods = [
  'get',
  'put',
  'post',
  'patch',
  'head',
  'delete'];


  var requestors = (0, _zipObject3.default)(methods, (0, _map3.default)(methods, httpRequestorForMethod));
  return (0, _chainable.chainableGeneratorWithDefaults)((0, _assign2.default)(requestors, {
    separator: '/',

    /**
                     * A mechanism so users can use keywords like
                     * `get` and `post` as path endpoints.
                     * @param {string} endpoint The endpoint to push.
                     * @returns {Proxy} The chainable child object.
                     */
    path: function path(endpoint) {
      if (!(0, _isString3.default)(endpoint) && !(0, _isNumber3.default)(endpoint)) {
        throw new TypeError('Path endpoint must be a string or numeric value.');
      }

      return (0, _chainable2.default)((0, _extends3.default)({},
      this, {
        tokens: [].concat((0, _toConsumableArray3.default)(this.tokens), [endpoint]) }));

    } }));

}();

/**
      * Creates a new chainable fetch api that will make requests to "options.host".
      * The given options will be merged with the defaults from above and a chainable
      * proxy object will be returned.
      * @function
      */exports.default =
function (options) {
  var httpOptions = (0, _isPlainObject3.default)(options) ? (0, _extends3.default)({}, options) : { host: options };
  var host = (0, _utils.getSanitizedHostname)(httpOptions);

  if (!/^https?:\/\/.+/.test(host)) {
    throw new TypeError('Host must be a valid url with a protocol and hostname.');
  }

  return chainableFetch({
    prefix: host,
    httpOptions: httpOptions });

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXNwb25zZSIsInR5cGUiLCJtZXRob2QiLCJuYW1lIiwiZGVzZXJpYWxpemUiLCJjb25zdW1lUmVzcG9uc2UiLCJzZXRSZXF1ZXN0VHlwZSIsImZldGNoIiwid2luZG93IiwicmVxdWlyZSIsImZvcm1hdEh0dHBPcHRpb25zIiwidXJsIiwiYm9keSIsInF1ZXJ5IiwiaGVhZGVycyIsInJlc3QiLCJocmVmIiwic2VyaWFsaXplIiwiZGVmYXVsdEVycm9ySGFuZGxlciIsInJlcXVlc3QiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiRXJyb3IiLCJnZXRSZXF1ZXN0VHlwZSIsInJlcXVlc3RUeXBlcyIsImhhcyIsImdldCIsImh0dHBSZXF1ZXN0b3JGb3JNZXRob2QiLCJpbnB1dCIsIlR5cGVFcnJvciIsImJhc2UiLCJ0b1N0cmluZyIsIm9wdGlvbnMiLCJodHRwT3B0aW9ucyIsImludGVyY2VwdG9yIiwiZm9ybWF0dGVkT3B0aW9ucyIsInJhdyIsInJlc3BvbnNlSW50ZXJjZXB0b3IiLCJoYW5kbGVSZXNwb25zZUVycm9yIiwib2siLCJjaGFpbmFibGVGZXRjaCIsIm1ldGhvZHMiLCJyZXF1ZXN0b3JzIiwic2VwYXJhdG9yIiwicGF0aCIsImVuZHBvaW50IiwidG9rZW5zIiwiaG9zdCIsInRlc3QiLCJwcmVmaXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcURBOzs7Ozs7O0FBT0EsbUJBQStCQSxRQUEvQixjQUEyQ0MsSUFBM0MsU0FBMkNBLElBQTNDO0FBQ1FDLGtCQURSLEdBQ2lCLDBCQUFhRixTQUFTQyxLQUFLRSxJQUFkLENBQWIsSUFBb0NGLEtBQUtFLElBQXpDLEdBQWdELE1BRGpFO0FBRVNGLGdCQUZULDBCQUVnQ0QsU0FBU0UsTUFBVCxHQUZoQyxpRkFFY0UsV0FGZCwrRixtQkFBZUMsZTs7O0FBS2Y7Ozs7a1ZBekRB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Q0FBYyx3REFBZCxDQUFOO0FBQ0Q7O0FBRUQsU0FBT1csZUFBZTtBQUNwQlMsWUFBUUYsSUFEWTtBQUVwQmQsNEJBRm9CLEVBQWYsQ0FBUDs7QUFJRCxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIGNoYWluYWJsZSBmZXRjaCBsaWJyYXJ5LlxuICogQHNpbmNlIDUvOS8xOFxuICogQGZpbGVcbiAqL1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoYWluYWJsZSwgeyBjaGFpbmFibGVHZW5lcmF0b3JXaXRoRGVmYXVsdHMgfSBmcm9tICdAamFzb25wb2xsbWFuL2NoYWluYWJsZSc7XG5pbXBvcnQgeyByZXF1ZXN0VHlwZXMgfSBmcm9tICcuL3R5cGVzJztcblxuaW1wb3J0IHtcbiAgcXVlcnlzdHJpbmdpZnksXG4gIGdldFNhbml0aXplZEhvc3RuYW1lLFxuICB3aXRob3V0TmlsVmFsdWVzLFxufSBmcm9tICcuL3V0aWxzJztcblxuLy8gRXhwb3NpbmcgdGhpcyBzbyB1c2VycyBjYW4gZGVmaW5lIHRoZWlyIG93biByZXF1ZXN0IHR5cGVzLlxuZXhwb3J0IHsgc2V0UmVxdWVzdFR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLy8gSW4gdGhlIGJyb3dzZXIsIHRoaXMgd2lsbCB3b3JrIHdpdGggdmFyaW91cyBidW5kbGVycyBsaWtlIHdlYnBhY2tcbi8vIHVzaW5nIHRoZSBuYXRpdmUgYnJvd3NlciBgZmV0Y2hgIGltcGxlbWVudGF0aW9uIG9yIGEgcG9seWZpbGwsIGJ1dFxuLy8geW91J2xsIG5lZWQgdG8gaWdub3JlIHRoZSBgbm9kZS1mZXRjaGAgbGlicmFyeS5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBnbG9iYWwtcmVxdWlyZVxuY29uc3QgZmV0Y2ggPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogdGVzdGluZyBvY2N1cnJzIGluIG5vZGUgKi9cbiAgPyB3aW5kb3cuZmV0Y2hcbiAgOiByZXF1aXJlKCdub2RlLWZldGNoJyk7XG5cbi8qKlxuICogRm9ybWF0cyB0aGUgSFRUUCByZXF1ZXN0IG9wdGlvbnMgYnkgYWRkaW5nIHRoZSBxdWVyeSBzdHJpbmcgdG8gdGhlIGJhc2UgdXJsLFxuICogdXBwZXJjYXNpbmcgdGhlIG1ldGhvZCwgZXRjLiBZb3UgY2FuIHBhc3MgYWRkaXRpb25hbCBvcHRpb25zIHRoYXQgW25vZGUtXWZldGNoIHN1cHBvcnRzIGhlcmVcbiAqIChzdWNoIGFzICdmb2xsb3cnLCAndGltZW91dCcsIGV0Yy4pLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgSFRUUCByZXF1ZXN0IG9wdGlvbnMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZm9ybWF0dGVkIHJlcXVlc3Qgb3B0aW9ucy5cbiAqL1xuY29uc3QgZm9ybWF0SHR0cE9wdGlvbnMgPSAoe1xuICB1cmwsXG4gIHR5cGUsXG4gIGJvZHksXG4gIHF1ZXJ5LFxuICBtZXRob2QsXG4gIGhlYWRlcnMsXG4gIC4uLnJlc3Rcbn0pID0+IHdpdGhvdXROaWxWYWx1ZXMoe1xuICB0eXBlLFxuICBxdWVyeSxcbiAgaHJlZjogYCR7dXJsfSR7cXVlcnlzdHJpbmdpZnkocXVlcnkpfWAsXG4gIGJvZHk6IGJvZHkgJiYgdHlwZS5zZXJpYWxpemUoYm9keSksXG4gIG1ldGhvZDogXy50b1VwcGVyKG1ldGhvZCksXG4gIGhlYWRlcnM6IF8uZGVmYXVsdHMoe30sIGhlYWRlcnMsIHR5cGUuaGVhZGVycyksXG4gIC4uLnJlc3QsXG59KTtcblxuLyoqXG4gKiBQcm9jZXNzZXMgYSBcIm5vbi1yYXdcIiByZXNwb25zZS5cbiAqIFRoaXMgd2lsbCBjb25zdW1lIHRoZSByZXNwb25zZSB3aXRoIHRoZSBkZXNpcmVkIHJlc3BvbnNlIGB0eXBlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSBUaGUgaHR0cCByZXNwb25zZSBmcm9tIGZldGNoLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgSFRUUCByZXF1ZXN0IG9wdGlvbnMuXG4gKiBAcmV0dXJucyB7QnVmZmVyfE9iamVjdHxzdHJpbmd9IFRoZSByZXNwb25zZSBpbiB0aGUgZGVzaXJlZCBmb3JtYXQuXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNvbnN1bWVSZXNwb25zZShyZXNwb25zZSwgeyB0eXBlIH0pIHtcbiAgY29uc3QgbWV0aG9kID0gXy5pc0Z1bmN0aW9uKHJlc3BvbnNlW3R5cGUubmFtZV0pID8gdHlwZS5uYW1lIDogJ3RleHQnO1xuICByZXR1cm4gdHlwZS5kZXNlcmlhbGl6ZShhd2FpdCByZXNwb25zZVttZXRob2RdKCkpO1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHJlc3BvbnNlIGVycm9yIGhhbmRsZXIgKGlmIG5vbmUgd2FzIHN1cHBsaWVkIGJ5IHRoZSB1c2VyKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSBUaGUgSFRUUCByZXNwb25zZSBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCBUaGUgSFRUUCByZXF1ZXN0IG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGRlZmF1bHRFcnJvckhhbmRsZXIocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgY29uc3Qge1xuICAgIHN0YXR1cyxcbiAgICBzdGF0dXNUZXh0LFxuICB9ID0gcmVzcG9uc2U7XG5cbiAgdGhyb3cgT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoYFJlcXVlc3QgdG8gJHtyZXF1ZXN0LmhyZWZ9IGZhaWxlZDogWyR7c3RhdHVzfV0gJHtzdGF0dXNUZXh0fWApLCB7XG4gICAgcmVxdWVzdCxcbiAgICByZXNwb25zZSxcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgcmVxdWVzdCB0eXBlIGZyb20gdGhlIHByZS1kZWZpbmVkIHJlcXVlc3QgdHlwZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBIVFRQIHJlcXVlc3Qgb3B0aW9ucy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXF1ZXN0IHR5cGUgZGVmaW5pdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGdldFJlcXVlc3RUeXBlKHsgdHlwZSA9ICdqc29uJyB9KSB7XG4gIGlmICghcmVxdWVzdFR5cGVzLmhhcyh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJlcXVlc3QgdHlwZSBcIiR7dHlwZX1cImApO1xuICByZXR1cm4gcmVxdWVzdFR5cGVzLmdldCh0eXBlKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtYWtlcyBhbiBIVFRQIHJlcXVlc3QgdXNpbmcgZmV0Y2ggYW5kIHRoZSBwcm92aWRlZCBtZXRob2QuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIFRoZSBIVFRQIG1ldGhvZCB0aGlzIGh0dHAgcmVxdWVzdCBtZXRob2QgaXMgZm9yLlxuICogQHJldHVybnMge2Z1bmN0aW9ufSBBIGh0dHAgcmVxdWVzdCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gaHR0cFJlcXVlc3RvckZvck1ldGhvZChtZXRob2QpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHJlcXVlc3QoaW5wdXQgPSB7fSkge1xuICAgIGlmICghXy5pc1BsYWluT2JqZWN0KGlucHV0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVxdWVzdCBvcHRpb25zIG11c3QgYmUgYSBwbGFpbiBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYmFzZSA9IHtcbiAgICAgIHVybDogdGhpcy50b1N0cmluZygpLFxuICAgICAgdHlwZTogZ2V0UmVxdWVzdFR5cGUoaW5wdXQpLFxuICAgICAgbWV0aG9kLFxuICAgIH07XG5cbiAgICBjb25zdCBvcHRpb25zID0gXy5kZWZhdWx0cyhiYXNlLCBpbnB1dCwgdGhpcy5odHRwT3B0aW9ucywgeyBmZXRjaCB9KTtcblxuICAgIC8vIFBpcGUgdGhlIG9wdGlvbnMgdG8gdGhlIHJlcXVlc3QgaW50ZXJjZXB0b3IsIGl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgIC8vIGJlIHVzZWQgaW4gbGlldSBvZiB0aGUgZ2l2ZW4gb3B0aW9ucy4gSGVyZSB5b3UgY2FuIGZvcmNlIGhlYWRlcnMsIGV0Yy5cbiAgICBjb25zdCBpbnRlcmNlcHRvciA9IF8uZ2V0KG9wdGlvbnMsICdpbnRlcmNlcHRvcnMucmVxdWVzdCcsIF8uaWRlbnRpdHkpO1xuICAgIGNvbnN0IGZvcm1hdHRlZE9wdGlvbnMgPSBhd2FpdCBpbnRlcmNlcHRvcihmb3JtYXRIdHRwT3B0aW9ucyhvcHRpb25zKSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9wdGlvbnMuZmV0Y2goZm9ybWF0dGVkT3B0aW9ucy5ocmVmLCBmb3JtYXR0ZWRPcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5yYXcpIHJldHVybiByZXNwb25zZTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSW50ZXJjZXB0b3IgPSBfLmdldChvcHRpb25zLCAnaW50ZXJjZXB0b3JzLnJlc3BvbnNlJywgXy5pZGVudGl0eSk7XG4gICAgY29uc3QgaGFuZGxlUmVzcG9uc2VFcnJvciA9IF8uZ2V0KG9wdGlvbnMsICdoYW5kbGVSZXNwb25zZUVycm9yJywgZGVmYXVsdEVycm9ySGFuZGxlcik7XG5cbiAgICAvLyBJZiB0aGUgcmVzcG9uc2UgaXMgXCJva1wiIGNvbnN1bWUgaXQgYW5kIHBpcGUgaXQgdG8gdGhlIHJlc3BvbnNlIGludGVyY2VwdG9yLlxuICAgIC8vIElmIG5vdCwgaW52b2tlIHRoZSB1c2VyJ3MgYGhhbmRsZVJlc3BvbnNlRXJyb3JgIG1ldGhvZC5cbiAgICByZXR1cm4gcmVzcG9uc2Uub2tcbiAgICAgID8gcmVzcG9uc2VJbnRlcmNlcHRvcihhd2FpdCBjb25zdW1lUmVzcG9uc2UocmVzcG9uc2UsIG9wdGlvbnMpLCBmb3JtYXR0ZWRPcHRpb25zLCByZXNwb25zZSlcbiAgICAgIDogaGFuZGxlUmVzcG9uc2VFcnJvcihmb3JtYXR0ZWRPcHRpb25zLCByZXNwb25zZSk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFwiYmFzZVwiIGNoYWluYWJsZSBvYmplY3QgZm9yIHVzZSB3aXRoIGNoYWluYWJsZS1mZXRjaC5cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IGNoYWluYWJsZUZldGNoID0gKCgpID0+IHtcbiAgY29uc3QgbWV0aG9kcyA9IFtcbiAgICAnZ2V0JyxcbiAgICAncHV0JyxcbiAgICAncG9zdCcsXG4gICAgJ3BhdGNoJyxcbiAgICAnaGVhZCcsXG4gICAgJ2RlbGV0ZScsXG4gIF07XG5cbiAgY29uc3QgcmVxdWVzdG9ycyA9IF8uemlwT2JqZWN0KG1ldGhvZHMsIF8ubWFwKG1ldGhvZHMsIGh0dHBSZXF1ZXN0b3JGb3JNZXRob2QpKTtcbiAgcmV0dXJuIGNoYWluYWJsZUdlbmVyYXRvcldpdGhEZWZhdWx0cyhPYmplY3QuYXNzaWduKHJlcXVlc3RvcnMsIHtcbiAgICBzZXBhcmF0b3I6ICcvJyxcblxuICAgIC8qKlxuICAgICAqIEEgbWVjaGFuaXNtIHNvIHVzZXJzIGNhbiB1c2Uga2V5d29yZHMgbGlrZVxuICAgICAqIGBnZXRgIGFuZCBgcG9zdGAgYXMgcGF0aCBlbmRwb2ludHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGVuZHBvaW50IFRoZSBlbmRwb2ludCB0byBwdXNoLlxuICAgICAqIEByZXR1cm5zIHtQcm94eX0gVGhlIGNoYWluYWJsZSBjaGlsZCBvYmplY3QuXG4gICAgICovXG4gICAgcGF0aDogZnVuY3Rpb24gcGF0aChlbmRwb2ludCkge1xuICAgICAgaWYgKCFfLmlzU3RyaW5nKGVuZHBvaW50KSAmJiAhXy5pc051bWJlcihlbmRwb2ludCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGF0aCBlbmRwb2ludCBtdXN0IGJlIGEgc3RyaW5nIG9yIG51bWVyaWMgdmFsdWUuJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGFpbmFibGUoe1xuICAgICAgICAuLi50aGlzLFxuICAgICAgICB0b2tlbnM6IFsuLi50aGlzLnRva2VucywgZW5kcG9pbnRdLFxuICAgICAgfSk7XG4gICAgfSxcbiAgfSkpO1xufSkoKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGNoYWluYWJsZSBmZXRjaCBhcGkgdGhhdCB3aWxsIG1ha2UgcmVxdWVzdHMgdG8gXCJvcHRpb25zLmhvc3RcIi5cbiAqIFRoZSBnaXZlbiBvcHRpb25zIHdpbGwgYmUgbWVyZ2VkIHdpdGggdGhlIGRlZmF1bHRzIGZyb20gYWJvdmUgYW5kIGEgY2hhaW5hYmxlXG4gKiBwcm94eSBvYmplY3Qgd2lsbCBiZSByZXR1cm5lZC5cbiAqIEBmdW5jdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCAob3B0aW9ucykgPT4ge1xuICBjb25zdCBodHRwT3B0aW9ucyA9IF8uaXNQbGFpbk9iamVjdChvcHRpb25zKSA/IHsgLi4ub3B0aW9ucyB9IDogeyBob3N0OiBvcHRpb25zIH07XG4gIGNvbnN0IGhvc3QgPSBnZXRTYW5pdGl6ZWRIb3N0bmFtZShodHRwT3B0aW9ucyk7XG5cbiAgaWYgKCEvXmh0dHBzPzpcXC9cXC8uKy8udGVzdChob3N0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0hvc3QgbXVzdCBiZSBhIHZhbGlkIHVybCB3aXRoIGEgcHJvdG9jb2wgYW5kIGhvc3RuYW1lLicpO1xuICB9XG5cbiAgcmV0dXJuIGNoYWluYWJsZUZldGNoKHtcbiAgICBwcmVmaXg6IGhvc3QsXG4gICAgaHR0cE9wdGlvbnMsXG4gIH0pO1xufTtcbiJdfQ==