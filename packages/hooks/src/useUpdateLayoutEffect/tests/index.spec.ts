import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useUpdateLayoutEffect from '../index';

describe('useUpdateLayoutEffect', () => {
  test('test on mounted', async () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateLayoutEffect(() => {
        mountedState = 2;
      }),
    );
    expect(mountedState).toBe(1);
    hook.rerender();
    expect(mountedState).toBe(2);
  });
  test('test on optional', () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateLayoutEffect(() => {
        mountedState = 3;
      }, [mountedState]),
    );
    expect(mountedState).toBe(1);
    hook.rerender();
    expect(mountedState).toBe(1);
    mountedState = 2;
    hook.rerender();
    expect(mountedState).toBe(3);
  });
});
