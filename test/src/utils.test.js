import { expect } from 'chai';

import {
  tryJsonParse,
  maybeStringify,
  querystringify,
  tryJsonStringify,
  withoutNilValues,
  isOfQueryStringType,
  getSanitizedHostname,
} from '../../src/utils';

describe('utils', () => {
  describe('querystringify', () => {
    it('Should return an empty string if given a nil value', () => {
      expect(querystringify()).to.equal('');
      expect(querystringify(null)).to.equal('');
      expect(querystringify({})).to.equal('');
      expect(querystringify([])).to.equal('');
    });

    it('Should properly format a querystring (1)', () => {
      expect(querystringify({ foo: 'bar' })).to.equal('?foo=bar');
    });

    it('Should properly format a querystring (2)', () => {
      expect(querystringify({ foo: 'bar', one: 1, two: 2 })).to.equal('?foo=bar&one=1&two=2');
    });

    it('Should properly format a querystring (3)', () => {
      const input = {
        foo: 'bar',
        one: 1,
        two: 2,
        arr: [1, 2, 3],
      };

      expect(querystringify(input)).to.equal('?foo=bar&one=1&two=2&arr=%5B1%2C2%2C3%5D');
    });

    it('Should properly format a querystring (4)', () => {
      const input = {
        foo: 'bar',
        one: 1,
        two: 2,
        arr: [1, 2, 3],
        obj: {
          x: 'y',
        },
      };

      expect(querystringify(input)).to.equal('?foo=bar&one=1&two=2&arr=%5B1%2C2%2C3%5D&obj=%7B%22x%22%3A%22y%22%7D');
    });

    it('Should URI encode values', () => {
      expect(querystringify({ foo: 'bar baz' })).to.equal('?foo=bar%20baz');
    });
  });

  describe('getSanitizedHostname', () => {
    it('Should get the `host` property from an object', () => {
      expect(getSanitizedHostname({ host: 'host' })).to.equal('host');
    });

    it('Should strip trailing slashes from a hostname', () => {
      expect(getSanitizedHostname({ host: 'host/' })).to.equal('host');
      expect(getSanitizedHostname({ host: 'host///' })).to.equal('host');
    });

    it('Should trim a hostname', () => {
      expect(getSanitizedHostname({ host: '   host/   ' })).to.equal('host');
      expect(getSanitizedHostname({ host: ' host/// ' })).to.equal('host');
    });

    it('Should return an empty string for invalid input', () => {
      expect(getSanitizedHostname()).to.equal('');
      expect(getSanitizedHostname(null)).to.equal('');
      expect(getSanitizedHostname({ host: null })).to.equal('');
    });
  });

  describe('withoutNilValues', () => {
    it('Should remove nil values from an object (1)', () => {
      expect(withoutNilValues({})).to.eql({});
    });

    it('Should remove nil values from an object (2)', () => {
      expect(withoutNilValues({ a: undefined, b: null })).to.eql({});
    });

    it('Should remove nil values from an object (3)', () => {
      expect(withoutNilValues({ a: undefined, b: null, c: 'c' })).to.eql({ c: 'c' });
    });
  });

  describe('isOfQueryStringType', () => {
    it('Should return `true` if given a string', () => {
      expect(isOfQueryStringType('foo')).to.equal(true);
    });

    it('Should return `true` if given a number', () => {
      expect(isOfQueryStringType(5)).to.equal(true);
    });

    it('Should return `true` if given an object', () => {
      expect(isOfQueryStringType([])).to.equal(true);
      expect(isOfQueryStringType({})).to.equal(true);
    });

    it('Should return `false` for non strings, numbers and objects', () => {
      expect(isOfQueryStringType()).to.equal(false);
      expect(isOfQueryStringType(() => {})).to.equal(false);
    });
  });

  describe('maybeStringify', () => {
    it('Should stringify objects (1)', () => {
      expect(maybeStringify({ foo: 'bar' })).to.equal(JSON.stringify({ foo: 'bar' }));
    });

    it('Should stringify objects (2)', () => {
      expect(maybeStringify([1, 2, 3])).to.equal(JSON.stringify([1, 2, 3]));
    });

    it('Should not stringify non-objects', () => {
      expect(maybeStringify('test')).to.equal('test');
    });
  });

  describe('tryJsonStringify', () => {
    it('Should stringify values', () => {
      expect(tryJsonStringify({ foo: 'bar' })).to.equal(JSON.stringify({ foo: 'bar' }));
    });

    it('Should return the input if stringification fails', () => {
      const obj = {};
      obj.obj = obj;

      expect(tryJsonStringify(obj)).to.equal(obj);
    });
  });

  describe('tryJsonParse', () => {
    it('Should stringify values', () => {
      expect(tryJsonParse(JSON.stringify({ foo: 'bar' }))).to.eql({ foo: 'bar' });
    });

    it('Should return the input if parsing fails', () => {
      expect(tryJsonParse('NOT JSON')).to.equal('NOT JSON');
    });
  });
});
