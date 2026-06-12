import { act, renderHook } from '@testing-library/react';
import { useCallback, useRef, useState } from 'react';
import { describe, expect, test } from 'vitest';
import { sleep } from '../../utils/testingHelpers';
import useLockFn from '../index';

describe('useLockFn', () => {
  const setUp = (): any =>
    renderHook(() => {
      const [tag, updateTag] = useState(false);
      const countRef = useRef(0);
      const persistFn = useCallback(
        async (step: number) => {
          countRef.current += step;
          await sleep(50);
        },
        [tag],
      );
      const locked = useLockFn(persistFn);

      return {
        locked,
        countRef,
        updateTag: () => updateTag(true),
      };
    });

  test('should work', async () => {
    const hook = setUp();
    const { locked, countRef } = hook.result.current;
    locked(1);
    expect(countRef.current).toBe(1);
    locked(2);
    expect(countRef.current).toBe(1);
    await sleep(30);
    locked(3);
    expect(countRef.current).toBe(1);
    await sleep(30);
    locked(4);
    expect(countRef.current).toBe(5);
    locked(5);
    expect(countRef.current).toBe(5);
  });

  test('should same', () => {
    const hook = setUp();
    const preLocked = hook.result.current.locked;
    hook.rerender();
    expect(hook.result.current.locked).toEqual(preLocked);
    act(hook.result.current.updateTag);
    expect(hook.result.current.locked).not.toEqual(preLocked);
  });
});
