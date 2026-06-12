import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useNetwork from '../index';

describe('useNetwork', () => {
  test('toggle network state', () => {
    const { result } = renderHook(() => useNetwork());
    expect(result.current.online).toBeTruthy();
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current.online).toBeFalsy();
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current.online).toBeTruthy();
  });
});
