import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { isBoolean, isFunction, isNumber, isObject, isString, isUndef, isReactRef } from '../index';

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
    expect(isNumber(NaN)).toBe(true);

    expect(isNumber('str')).toBe(false);
    expect(isNumber({})).toBe(false);
  });

  test('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new RegExp(''))).toBe(true);
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

  test('isReactRef', () => {
    const refHook = renderHook(() => useRef(null));
    expect(isReactRef(refHook.result.current)).toBeTruthy();
    const error_data1 = { base: { current: null } };
    expect(isReactRef(error_data1)).toBeFalsy();
    const error_data2 = { current: 'hello', current2: 'world' };
    expect(isReactRef(error_data2)).toBeFalsy();
  });
});
