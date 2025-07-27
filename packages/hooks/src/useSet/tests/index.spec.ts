import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useSet from '../index';

const setUp = <K>(initialSet?: Iterable<K>) => renderHook(() => useSet(initialSet));

describe('useSet', () => {
  test('should init set and utils', () => {
    const { result } = setUp([1, 2]);
    const [set, utils] = result.current;

    expect(set).toEqual(new Set([1, 2]));
    expect(utils).toStrictEqual({
      add: expect.any(Function),
      remove: expect.any(Function),
      reset: expect.any(Function),
    });
  });

  test('should init empty set if no initial set provided', () => {
    const { result } = setUp();
    expect(result.current[0]).toEqual(new Set());

    const { result: result1 } = setUp(undefined);
    expect(result1.current[0]).toEqual(new Set());
  });

  test('should have an initially provided key', () => {
    const { result } = setUp(['a']);
    const [set, utils] = result.current;

    let value = false;
    act(() => {
      value = set.has('a');
    });

    expect(value).toBe(true);
  });

  test('should have an added key', () => {
    const { result } = setUp();

    act(() => {
      result.current[1].add('newKey');
    });

    let value = false;
    act(() => {
      value = result.current[0].has('newKey');
    });

    expect(value).toBe(true);
  });

  test('should get false for non-existing key', () => {
    const { result } = setUp(['a']);
    const [set] = result.current;

    let value = true;
    act(() => {
      value = set.has('nonExisting');
    });

    expect(value).toBe(false);
  });

  test('should add a new key', () => {
    const { result } = setUp(['oldKey']);
    const [, utils] = result.current;

    act(() => {
      utils.add('newKey');
    });

    expect(result.current[0]).toEqual(new Set(['oldKey', 'newKey']));
  });

  test('should work if setting existing key', () => {
    const { result } = setUp(['oldKey']);
    const [, utils] = result.current;

    act(() => {
      utils.add('oldKey');
    });

    expect(result.current[0]).toEqual(new Set(['oldKey']));
  });

  test('should remove existing key', () => {
    const { result } = setUp([1, 2]);
    const [, utils] = result.current;

    act(() => {
      utils.remove(2);
    });

    expect(result.current[0]).toEqual(new Set([1]));
  });

  test('should do nothing if removing non-existing key', () => {
    const { result } = setUp(['a', 'b']);
    const [, utils] = result.current;

    act(() => {
      utils.remove('nonExisting');
    });

    expect(result.current[0]).toEqual(new Set(['a', 'b']));
  });

  test('should reset to initial set provided', () => {
    const { result } = setUp([1]);
    const [, utils] = result.current;

    act(() => {
      utils.add(2);
    });

    expect(result.current[0]).toEqual(new Set([1, 2]));

    act(() => {
      utils.reset();
    });

    expect(result.current[0]).toEqual(new Set([1]));
  });

  test('should memoized its utils methods', () => {
    const { result } = setUp(['a', 'b']);
    const [, utils] = result.current;
    const { add, remove, reset } = utils;

    act(() => {
      add('foo');
    });

    expect(result.current[1].add).toBe(add);
    expect(result.current[1].remove).toBe(remove);
    expect(result.current[1].reset).toBe(reset);
  });
});
