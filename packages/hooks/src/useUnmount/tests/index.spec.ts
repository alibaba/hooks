import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import useUnmount from '../index';

describe('useUnmount', () => {
  test('useUnmount should work', async () => {
    const fn = vi.fn();
    const hook = renderHook(() => useUnmount(fn));
    expect(fn).toBeCalledTimes(0);
    hook.rerender();
    expect(fn).toBeCalledTimes(0);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);
  });
});
