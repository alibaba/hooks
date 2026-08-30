import { describe, expect, test } from 'vitest';
import {
  isBoolean,
  isFunction,
  isNonNullable,
  isNumber,
  isObject,
  isString,
  isThenable,
  isUndef,
} from '../';

describe('shared utils methods', () => {
  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);

    expect(isBoolean('')).toBe(false);
    expect(isBoolean([])).toBe(false);
  });

  test('isFunction', () => {
    expect(isFunction(function foo() {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);

    expect(isFunction({})).toBe(false);
    expect(isFunction(1)).toBe(false);
  });

  test('isNumber', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(false);

    expect(isNumber('str')).toBe(false);
    expect(isNumber({})).toBe(false);
  });

  test('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(/(?:)/)).toBe(true);
    expect(isObject(new Date())).toBe(true);

    expect(isObject(null)).toBe(false);
    expect(isObject(function foo() {})).toBe(false);
    expect(isObject(123)).toBe(false);
  });

  test('isString', () => {
    expect(isString('1')).toBe(true);
    expect(isString(String('1'))).toBe(true);

    expect(isString(1)).toBe(false);
    expect(isString({})).toBe(false);
  });

  test('isUndef', () => {
    expect(isUndef(undefined)).toBe(true);

    expect(isUndef(0)).toBe(false);
    expect(isUndef(null)).toBe(false);
    expect(isUndef(NaN)).toBe(false);
    expect(isUndef('')).toBe(false);
  });

  test('isNonNullable', () => {
    expect(isNonNullable(0)).toBe(true);
    expect(isNonNullable('')).toBe(true);
    expect(isNonNullable(false)).toBe(true);
    expect(isNonNullable({})).toBe(true);
    expect(isNonNullable([])).toBe(true);
    expect(isNonNullable(null)).toBe(false);
    expect(isNonNullable(undefined)).toBe(false);
  });

  test('isThenable', () => {
    expect(isThenable(Promise.resolve())).toBe(true);
    expect(isThenable({ then: () => {} })).toBe(true);
    expect(isThenable({ then: function () {} })).toBe(true);
    expect(isThenable({ then: 'NOT THENABLE' })).toBe(false);
    expect(isThenable({})).toBe(false);
    expect(isThenable([])).toBe(false);
    expect(isThenable(null)).toBe(false);
    expect(isThenable(undefined)).toBe(false);
  });
});
