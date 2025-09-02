import { renderHook } from '@testing-library/react';
import useImmediateEffect from '../index';
import { describe, expect, it } from 'vitest';

describe('useImmediateEffect', () => {
  it('test immediate', async () => {
    let mountedState = 1;
    const hook = renderHook(() => {
      useImmediateEffect(() => {
        mountedState = 2;
      });
      mountedState = 3;
    });
    expect(mountedState).toBe(3);
    hook.rerender();
    expect(mountedState).toBe(3);
  });
  it('test on optional', () => {
    let mountedState = 1;
    let effectCount = 0;
    const hook = renderHook(() => {
      useImmediateEffect(() => {
        ++effectCount;
      }, [mountedState]);
    });
    expect(effectCount).toBe(1);
    hook.rerender();
    expect(effectCount).toBe(1);
    mountedState = 2;
    hook.rerender();
    expect(mountedState).toBe(2);
  });
});
