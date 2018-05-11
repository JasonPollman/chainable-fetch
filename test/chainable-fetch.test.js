import _ from 'lodash';
import sinon from 'sinon';

import {
  assert,
  expect,
} from 'chai';

import {
  toXml,
  toJson,
} from 'xml2json';

import chainableFetch, { setRequestType } from '../src';

/**
 * `assert.throws` with async support.
 * @param {function} method The method that's expected to throw.
 * @param {RegExp|string} message The expected error message.
 * @returns {undefined}
 */
async function assertThrowsAsync(method, message) {
  try {
    await method();
  } catch (e) {
    if (_.isRegExp(message)) {
      expect(e.message).to.match(new RegExp(message));
    } else {
      expect(e.message).to.equal(message);
    }

    return;
  }

  throw new Error('Expected function to throw an error');
}

describe('chainable-fetch', () => {
  const methods = [
    'get',
    'put',
    'post',
    'delete',
  ];

  const host = `http://localhost:${_.get(process, 'env.PORT', 5678)}`;
  const api = chainableFetch(host);

  it('Should export a reference to `setRequestType`', () => {
    expect(setRequestType).to.be.a('function');
  });

  _.each(methods, (method) => {
    it(`Should successfully make a fetch request (${method}, default options)`, async () => {
      expect(await api.json[method]()).to.eql({
        success: true,
        body: {},
        query: {},
      });
    });

    it(`Should successfully make a fetch request (${method}, using "path" helper, 1)`, async () => {
      expect(await api.path('json')[method]()).to.eql({
        success: true,
        body: {},
        query: {},
      });
    });

    it(`Should successfully make a fetch request (${method}, using "path" helper, 2)`, async () => {
      expect(await api.path(200)[method]({ type: 'text' })).to.eql('OK');
    });

    it(`Should successfully make a fetch request (${method}, raw response)`, async () => {
      const response = await api.json[method]({ raw: true });

      expect(response.status).to.equal(200);
      expect(await response.json()).to.eql({
        success: true,
        body: {},
        query: {},
      });
    });

    it(`Should successfully make a fetch request (${method}, global raw response)`, async () => {
      const api2 = chainableFetch({
        host,
        raw: true,
      });

      const response = await api2.json[method]();

      expect(response.status).to.equal(200);
      expect(await response.json()).to.eql({
        success: true,
        body: {},
        query: {},
      });
    });

    it(`Should successfully make a fetch request (${method}, with interceptor)`, async () => {
      const api2 = chainableFetch({
        host,
        interceptors: {
          request: options => ({ ...options, href: `${host}/json` }),
          response: (results, options, res) => {
            expect(res.status).to.equal(200);
            expect(options.href).to.equal(`${host}/json`);
            expect(results).to.eql({
              success: true,
              body: {},
              query: {},
            });

            return { intercepted: true };
          },
        },
      });

      expect(await api2.text[method]()).to.eql({ intercepted: true });
    });
  });

  it('Should successfully make a fetch request (get, with query)', async () => {
    expect(await api.json.get({ query: { foo: 'bar' } })).to.eql({
      success: true,
      body: {},
      query: {
        foo: 'bar',
      },
    });
  });

  it('Should successfully make a fetch request (get, with JSON encoded query)', async () => {
    expect(await api.json.get({ query: { foo: { bar: 'baz' } } })).to.eql({
      success: true,
      body: {},
      query: {
        foo: {
          bar: 'baz',
        },
      },
    });
  });

  it('Should successfully make a fetch request (post, with body)', async () => {
    expect(await api.json.post({ body: { foo: 'bar' } })).to.eql({
      success: true,
      body: {
        foo: 'bar',
      },
      query: {},
    });
  });

  it('Should successfully handle an invalid request', () => assertThrowsAsync(
    () => api[404].post({ body: { foo: 'bar' } }),
    `Request to ${host}/404 failed: [404] Not Found`,
  ));

  it('Should successfully handle an invalid request (custom handler, 1)', () => assertThrowsAsync(
    () => api[404].post({
      handleResponseError: (request, response) => {
        expect(request).to.be.an('object');
        expect(request.href).to.equal('http://localhost:5678/404');
        expect(request.method).to.equal('POST');
        expect(response.status).to.equal(404);
        expect(response.statusText).to.equal('Not Found');
        throw new Error('oops...');
      },
      body: {
        foo: 'bar',
      },
    }),
    'oops...',
  ));

  it('Should successfully handle an invalid request (custom handler, 2)', async () => {
    const results = await api[404].post({
      handleResponseError: (request, response) => {
        expect(request).to.be.an('object');
        expect(request.href).to.equal('http://localhost:5678/404');
        expect(request.method).to.equal('POST');
        expect(response.status).to.equal(404);
        expect(response.statusText).to.equal('Not Found');
        return { handled: true };
      },
      body: {
        foo: 'bar',
      },
    });

    expect(results).to.eql({ handled: true });
  });

  it('Should successfully handle an invalid request (global custom handler)', async () => {
    const api2 = chainableFetch({
      host,
      handleResponseError: (request, response) => {
        expect(request).to.be.an('object');
        expect(request.href).to.equal('http://localhost:5678/404');
        expect(request.method).to.equal('POST');
        expect(response.status).to.equal(404);
        expect(response.statusText).to.equal('Not Found');
        return { handledGlobally: true };
      },
    });

    const results = await api2[404].post({
      body: {
        foo: 'bar',
      },
    });

    expect(results).to.eql({ handledGlobally: true });
  });

  _.each(methods, (method) => {
    it(`Should successfully make a fetch request (${method}, type text)`, async () => {
      expect(await api.text[method]({ type: 'text' })).to.eql('Hello World!');
    });

    it(`Should successfully make a fetch request (${method}, type text, json response)`, async () => {
      expect(JSON.parse(await api.json[method]({ type: 'text' }))).to.eql({
        success: true,
        body: {},
        query: {},
      });
    });
  });

  it('Should reject if attempting to use an unknown request type', () => assertThrowsAsync(
    () => api.text.get({ type: 'foo' }),
    'Invalid request type "foo"',
  ));

  it('Should throw if given an invalid host (1)', () => assert.throws(
    () => chainableFetch(),
    'Host must be a valid url with a protocol and hostname.',
  ));

  it('Should throw if given an invalid host (2)', () => assert.throws(
    () => chainableFetch({ host: '' }),
    'Host must be a valid url with a protocol and hostname.',
  ));

  it('Should throw if given an invalid host (3)', () => assert.throws(
    () => chainableFetch('ftp://'),
    'Host must be a valid url with a protocol and hostname.',
  ));

  it('Should throw if given non-valid request options', () => assertThrowsAsync(
    () => api.json.get([]),
    'Request options must be a plain object.',
  ));

  it('Should throw if given a non string or numeric path (1)', () => assertThrowsAsync(
    () => api.path({}).get([]),
    'Path endpoint must be a string or numeric value.',
  ));

  it('Should handle URI encoded paths (1)', async () => {
    const response = await api.path('foo bar').get({
      raw: true,
      type: 'text',
      query: {
        foo: 'bar',
      },
    });

    expect(response.status).to.equal(200);
  });

  it('Should handle URI encoded paths (2)', async () => {
    const response = await api['foo bar'].get({
      raw: true,
      type: 'text',
      query: {
        foo: 'bar',
      },
    });

    expect(response.status).to.equal(200);
  });

  it('Should allow for a custom fetch implementation (1)', async () => {
    const stub = sinon.stub().callsFake(() => Promise.resolve({
      status: 999,
    }));

    const response = await api['foo bar'].get({
      fetch: stub,
      raw: true,
      type: 'text',
      query: {
        foo: 'bar',
      },
    });

    expect(response.status).to.equal(999);
    expect(stub.calledOnce).to.equal(true);
  });

  it('Should allow for a custom fetch implementation (2)', async () => {
    const stub = sinon.stub().callsFake(() => Promise.resolve({
      status: 999,
    }));

    const api2 = chainableFetch({
      host,
      fetch: stub,
    });

    const response = await api2['foo bar'].get({
      raw: true,
      type: 'text',
      query: {
        foo: 'bar',
      },
    });

    expect(response.status).to.equal(999);
    expect(stub.calledOnce).to.equal(true);
  });

  describe('setRequestType', () => {
    it('Should throw if a non-object is given', () => assertThrowsAsync(
      () => setRequestType(),
      'Request type definition must be a plain object.',
    ));

    it('Should throw if a no `name` is provided', () => assertThrowsAsync(
      () => setRequestType({}),
      'Request type property `name` must be a string.',
    ));

    it('Should throw if a non-function `serialize` property is provided', () => assertThrowsAsync(
      () => setRequestType({ name: 'foo', serialize: [] }),
      'Request type property `serialize` must be a function.',
    ));

    it('Should throw if a non-function `deserialize` property is provided', () => assertThrowsAsync(
      () => setRequestType({ name: 'foo', serialize: _.noop }),
      'Request type property `deserialize` must be a function.',
    ));

    it('Should define a new, usable request type', async () => {
      setRequestType({
        name: 'xml',
        serialize: toXml,
        deserialize: _.partial(toJson, _, { object: true }),
      });

      expect(await api.xml.get({ type: 'xml' })).to.eql({
        foo: {
          attr: 'value',
          $t: 'bar',
        },
      });
    });
  });
});
