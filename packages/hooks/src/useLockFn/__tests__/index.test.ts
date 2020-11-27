import { renderHook, act } from '@testing-library/react-hooks';
import { useRef } from 'react';
import useLockFn from '../index';
import { sleep } from '../../utils/testingHelpers';

describe('useLockFn', () => {
  it('should be defined', () => {
    expect(useLockFn).toBeDefined();
  });

  const setUp = (): any =>
    renderHook(() => {
      const countRef = useRef(0);
      const locked = useLockFn(async (step: number) => {
        countRef.current += step;
        await sleep(50);
      });

      return {
        locked,
        countRef,
      };
    });

  it('should work', async () => {
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

  it('should same', () => {
    const hook = setUp();
    const preLocked = hook.result.current.locked;
    hook.rerender();
    expect(hook.result.current.locked).toEqual(preLocked);
  });
});
