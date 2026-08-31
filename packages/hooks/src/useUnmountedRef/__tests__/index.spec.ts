import type { MutableRefObject } from 'react';
import { describe, expect, expectTypeOf, test } from 'vitest';
import { renderHook } from '../../utils/tests';
import useUnmountedRef from '../index';

describe('useUnmountedRef', () => {
  test('should work', async () => {
    const hook = renderHook(() => useUnmountedRef());
    expectTypeOf(hook.result.current).toEqualTypeOf<MutableRefObject<boolean>>();
    expect(hook.result.current.current).toBe(false);
    hook.rerender();
    expect(hook.result.current.current).toBe(false);
    hook.unmount();
    expect(hook.result.current.current).toBe(true);
  });
});
