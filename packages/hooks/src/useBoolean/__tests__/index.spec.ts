import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useBoolean from '../index';

const setUp = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  test('test on methods', async () => {
    const { result } = setUp();
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].setTrue();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set(false);
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set(true);
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      // @ts-ignore
      result.current[1].set(0);
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      // @ts-ignore
      result.current[1].set('a');
    });
    expect(result.current[0]).toBe(true);
  });

  test('test on default value', () => {
    const hook1 = setUp(true);
    expect(hook1.result.current[0]).toBe(true);
    const hook2 = setUp();
    expect(hook2.result.current[0]).toBe(false);
    // @ts-ignore
    const hook3 = setUp(0);
    expect(hook3.result.current[0]).toBe(false);
    // @ts-ignore
    const hook4 = setUp('');
    expect(hook4.result.current[0]).toBe(false);
    // @ts-ignore
    const hook5 = setUp('hello');
    expect(hook5.result.current[0]).toBe(true);
  });
});
