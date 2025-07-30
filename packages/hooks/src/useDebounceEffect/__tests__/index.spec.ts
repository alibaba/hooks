import { act, type RenderHookResult, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { sleep } from '../../utils/testingHelpers';
import useDebounceEffect from '../index';

let hook: RenderHookResult<any, any>;

describe('useDebounceEffect', () => {
  test('useDebounceEffect should work', async () => {
    let mountedState = 1;
    const mockEffect = vi.fn(() => {});
    const mockCleanUp = vi.fn(() => {});
    act(() => {
      hook = renderHook(() =>
        useDebounceEffect(
          () => {
            mockEffect();
            return () => {
              mockCleanUp();
            };
          },
          [mountedState],
          { wait: 200 },
        ),
      );
    });

    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    mountedState = 2;
    hook.rerender();
    await sleep(50);
    mountedState = 3;
    hook.rerender();
    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    mountedState = 4;
    hook.rerender();
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(1);
  });

  test('should cancel timeout on unmount', async () => {
    const mockEffect = vi.fn(() => {});
    const mockCleanUp = vi.fn(() => {});

    const hook2 = renderHook(
      (props) =>
        useDebounceEffect(
          () => {
            mockEffect();
            return () => {
              mockCleanUp();
            };
          },
          [props],
          { wait: 200 },
        ),
      { initialProps: 0 },
    );

    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);

    hook2.rerender(1);
    await sleep(50);
    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);

    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);

    hook2.rerender(2);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(1);

    hook2.unmount();
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(2);
  });
});
