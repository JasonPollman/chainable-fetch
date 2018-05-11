# chainable-fetch
> The JSON friendly, string free HTTP request client.

**`chainable-fetch` is a HTTP request client tailored for JSON and ease of use.**    
Most request libraries focus on single requests, `chainable-fetch` focuses on api reuse.

It uses the [chainable](https://github.com/JasonPollman/chainable) library and `fetch`
under the hood ([node-fetch](https://github.com/bitinn/node-fetch) in node)
to provide a clean, hassle free experience.

**No more messy strings—just code.**    
`chainable-fetch` uses `Proxy` objects to build a request, rather than having to specify a string url.

```js
import chainableFetch from 'chainable-fetch';

const api = chainableFetch('https://my-api.com/');
await api.v1.users.get({
  query: {
    id: 1,
  },
});
```

**The default mode for `chainable-fetch` is JSON!**    
JSON is the standard, not the exception.

All request bodies and responses are automatically JSON stringified/parsed for you. `chainable-fetch`
assumes you're interacting with a JSON API. However, non-JSON requests are definately supported,
just set the request type to `text`, `buffer` or any other supported type.

**Configure request options once:**    
You setup the headers, request type (text, json, etc.) when you create your API reference *once*.
All requests will use these options and you can override them at individual the request level
for the edge cases.

This reduces code quantity and allows defaults to be set in a single place.

**Other Features**
- Request/Response Interceptors
- Custom Fetch Implementations
- Create Custom Request Types (XML, etc.)
- Piping Responses
- Buffer Responses
- Support for Node 6+ and browsers with `fetch` and `Proxy` available.

**See the [caveat](https://github.com/JasonPollman/chainable#limitations) about browser support!**

## Install
```bash
$ npm install chainable-fetch --save
```

## Usage
```js
import chainableFetch from 'chainable-fetch';

const api = chainableFetch('https://swapi.co/');

// Make a couple of HTTP requests to the Star Wars API...
// GET https://swapi.co/people
// GET https://swapi.co/planets
const [people, planets] = await Promise.all([
  api.people.get(),
  api.planets.get(),
]);

// You can even reference endpoints.
const people = api.people;
const person = people[1].get();

// You can chain together any endpoint!
const example = chainableFetch({
  host: 'https://swapi.co/'
});

await example.foo.bar.bax.quxx.get({ headers, query });
await example.foo.bar.bax.quxx.post({ headers, body });

// You can also sub-reference endpoints.
const baz = example.foo.bar;
await bax.quxx.get();

// Dynamic endpoints? Lodash's `get` method comes in handy...
await _.get(api, someValue).post();
```

**The following methods are supported:**
  - get
  - put
  - post
  - patch
  - head
  - delete

### Examples

```js
// This is useful if you version up your api!
// Now, when the next version comes out, you can simply change `v1` to `v2`.
const services = chainableFetch('https://my-api.com/').v1;

await services.user.get({
  query: {
    id: 1234,
  },
});

await services.user.post({
  body: {
    name: 'Chuck Norris',
  },
});

// Oops... my api has the keywords "get", "post", "put" in them...
// Seems silly, but you can use the `path` method.
// this will GET from https://my-api.com/user/get
await services.user.path('get').get();
```

## Setting Up Your API
When you create your chainable api, the following options are supported:

```js
import chainableFetch from 'chainable-fetch';

// You can specify only a string to use the default options (JSON).
const api = chainableFetch('https://my-api.com/');

// Or, you can provide options.
// The `host` property is required, defaults shows.
const api = chainableFetch({
  host: 'https://my-api.com/',

  // The api type.
  // Can be one of: 'json', 'text', 'buffer', 'blob'.
  // This defines how the response is consumed and returned to you.
  // For example, if json, fetch's `response.json()` is returned to you; if text response.text().
  type: 'json',

  // If true, the actual "raw" fetch response will be returned.
  // In this way you can decide how to consume the response.
  // Note, in raw mode any response interceptor will be ignored.
  raw: false,

  // Functions that can be used to intercept/change requests/responses.
  // Note, the return value of interceptors.request will modify the original request and
  // the return value of interceptors.response will be what's returned to the user.
  // These can be async.
  interceptors: {
    request: (requestOptions) => {
      ...
    },
    response: (parsedResponse, requestOptions, rawFetchResponse) => {
      ...
    },
  }

  // Default request headers
  // If none are supplied to the actual request, these are used.
  headers: {
    ...
  },

  // An optional method to determine how to handle request errors.
  // See src/index's method `defaultErrorHandler` for more details
  // on the default implementation.
  handleResponseError: (requestOptions, fetchResponseObject) => {
    ...
  }

  // The fetch library to use
  // If unspecified, the native fetch implementation will be used
  // in the browser and node-fetch in node.
  fetch,
})
```

## Making Requests
When you make a request, the following options are supported by *every* request method:

```js
import chainableFetch from 'chainable-fetch';

const services = chainableFetch('https://my-services.com/');

await services.some.endpoint[get|post|put|delete|patch|head]({
  // The query to append to the url.
  // This will be converted from an object to a querystring.
  // Note, this is slightly different than node's querystring.stringify,
  // since object values are automatically JSON.stringified.
  query: {
    ...
  }

  // The POST/PUT body
  // Can be a string, object, FormData, etc.
  body: {
    ...
  }

  // Key/value header pairs.
  // These will override any headers provided during api creation.
  headers: {
    ...
  },

  // The request type.
  // Can be one of: 'json', 'text', 'buffer', 'blob'.
  // Overrides the api's request `type` option above.
  type: 'json',

  // If true the actual "raw" fetch response will be returned.
  // Overrides the api's `raw` option above.
  raw: false,
})
```

## Request Types
"Request Types" are a interface that defines how a request body is serialized and the response
is deserialized. For example, the `json` request type stringifies the body and parses the response.

**The following are available by default:**

  - json
  - text
  - buffer
  - blob

### Custom Request Types
You can create custom request types (or override default ones) using the `setRequestType` export.

```js
import { setRequestType } from 'chainable-fetch';

// An example of the `json` request type.
setRequestType({
  // Required: request type name
  name: 'json',
  // Required: the method used to serialize the request body
  sanitize: JSON.stringify,
  // Required: The method used to deserialize the response body
  deserialize: JSON.parse,
  // Optional: Headers to be merged with the user's
  // request headers for requests of this type.
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
```

**Here's an example of implementing a custom XML request type.**

```js
import chainableFetch, { setRequestType } from 'chainable-fetch';
import xml2json from 'xml2json';

setRequestType({
  name: 'xml',
  serialize: xml2json.toXml,
  deserialize: body => xml2json.toJson(body, { object: true }),
});

const services = chainableFetch({
  host: 'https://my-xml-api.com/',
  type: 'xml,
});

// POSTs '<user id="5">Chunk Norris</user>' to https://my-xml-api.com/user
// The response, per our request type, would be XML converted to a js object.
const response = await services.user.post({
  foo: {
    id: 5,
    $t: 'Chuck Norris',
  },
});
```