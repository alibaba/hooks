import { renderHook } from '@testing-library/react';
import { useEffect, useLayoutEffect } from 'react';
import { describe, expect, test } from 'vitest';
import { createUpdateEffect } from '../index';

describe('createUpdateEffect', () => {
  test('should work for useEffect', () => {
    const useUpdateEffect = createUpdateEffect(useEffect);

    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        mountedState = 2;
      }),
    );
    expect(mountedState).toBe(1);
    hook.rerender();
    expect(mountedState).toBe(2);
  });

  test('should work for useLayoutEffect', () => {
    const useUpdateLayoutEffect = createUpdateEffect(useLayoutEffect);

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
});
