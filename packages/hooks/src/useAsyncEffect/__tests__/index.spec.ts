import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '../../utils/testingHelpers';
import useAsyncEffect from '../index';

describe('useAsyncEffect', () => {
  test.each([false, true])(
    'should finish generator cleanup after it yields (StrictMode: %s)',
    async (reactStrictMode) => {
      let resume = () => {};
      const pending = new Promise<void>((resolve) => {
        resume = resolve;
      });
      const releaseFirstResource = vi.fn();
      const releaseSecondResource = vi.fn();
      const { unmount } = renderHook(
        () => {
          useAsyncEffect(async function* () {
            try {
              await pending;
              yield;
            } finally {
              releaseFirstResource();
              yield;
              releaseSecondResource();
            }
          }, []);
        },
        { reactStrictMode },
      );

      unmount();
      await act(async () => {
        resume();
        await pending;
      });

      expect(releaseFirstResource).toHaveBeenCalled();
      expect(releaseSecondResource).toHaveBeenCalledTimes(releaseFirstResource.mock.calls.length);
    },
  );

  test('should run generator finally after an unmounted effect reaches a yield', async () => {
    let resume = () => {};
    const pending = new Promise<void>((resolve) => {
      resume = resolve;
    });
    const cleanup = vi.fn();
    const hook = renderHook(() => {
      useAsyncEffect(async function* () {
        try {
          await pending;
          yield;
        } finally {
          cleanup();
        }
      }, []);
    });

    hook.unmount();
    await act(async () => {
      resume();
      await pending;
    });

    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  test('should close the old generator after dependencies change', async () => {
    let resume = () => {};
    const pending = new Promise<void>((resolve) => {
      resume = resolve;
    });
    const cleanup = vi.fn();
    const hook = renderHook(
      ({ version }) => {
        useAsyncEffect(
          async function* () {
            try {
              await pending;
              yield;
            } finally {
              cleanup(version);
            }
          },
          [version],
        );
      },
      { initialProps: { version: 1 } },
    );

    hook.rerender({ version: 2 });
    await act(async () => {
      resume();
      await pending;
    });

    expect(cleanup.mock.calls.map(([version]) => version).sort()).toEqual([1, 2]);
    hook.unmount();
    expect(cleanup).toHaveBeenCalledTimes(2);
  });

  test('should work without clean up', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      useAsyncEffect(async () => {
        await sleep(100);
        setX(1);
      }, []);
      return x;
    });
    expect(hook.result.current).toBe(0);
    await act(async () => {
      await sleep(150);
    });
    expect(hook.result.current).toBe(1);
  });

  test('should work with yield break', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(1);
      const [y, setY] = useState(0);
      useAsyncEffect(
        async function* () {
          await sleep(100);
          yield;
          setY(x);
        },
        [x],
      );
      return {
        y,
        setX,
      };
    });
    expect(hook.result.current.y).toBe(0);

    await act(async () => {
      await sleep(50);
      hook.result.current.setX(2);
    });
    expect(hook.result.current.y).toBe(0);

    await act(async () => {
      await sleep(20);
    });
    expect(hook.result.current.y).toBe(0);

    await act(async () => {
      await sleep(50);
      hook.result.current.setX(3);
    });
    expect(hook.result.current.y).toBe(0);

    await act(async () => {
      await sleep(80);
    });
    expect(hook.result.current.y).toBe(0);

    await act(async () => {
      await sleep(50);
    });
    expect(hook.result.current.y).toBe(3);
  });

  test('should run a synchronous cleanup on unmount', () => {
    const cleanup = vi.fn();
    const hook = renderHook(() => {
      useAsyncEffect(() => cleanup, []);
    });

    expect(cleanup).not.toHaveBeenCalled();
    hook.unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  test('should clean up before rerunning after a dependency change', () => {
    const cleanups = [vi.fn(), vi.fn()];
    const hook = renderHook(
      ({ index }) => {
        useAsyncEffect(() => cleanups[index], [index]);
      },
      { initialProps: { index: 0 } },
    );

    hook.rerender({ index: 1 });
    expect(cleanups[0]).toHaveBeenCalledTimes(1);
    expect(cleanups[1]).not.toHaveBeenCalled();

    hook.unmount();
    expect(cleanups[1]).toHaveBeenCalledTimes(1);
  });
});
