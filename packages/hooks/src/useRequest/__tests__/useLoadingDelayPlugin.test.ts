import { act, renderHook, waitFor } from '@testing-library/react';
import type { RenderHookResult } from '@testing-library/react';
import useRequest from '../index';
import { request, sleep } from '../../utils/testingHelpers';

describe('useLoadingDelayPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));
  let hook: RenderHookResult<ReturnType<typeof useRequest>, any>;

  afterEach(() => {
    hook.unmount();
  });

  it('useLoadingDelayPlugin should work', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));

    act(() => {
      hook = setUp(request, {
        loadingDelay: 500,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      jest.advanceTimersByTime(501);
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.loading).toBe(false);
  });

  it('useLoadingDelayPlugin should no update loading when ready is false', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
        ready: false,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => expect(hook.result.current.loading).toBe(false));
  });

  it('useLoadingDelayPlugin should update loading when ready is undefined', async () => {
    act(() => {
      hook = setUp(request, {
        loadingDelay: 2000,
      });
    });
    expect(hook.result.current.loading).toBe(false);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => expect(hook.result.current.loading).toBe(true));
  });

  it.only('useLoadingDelayPlugin should update loading when loadingDelay is reset and refreshDeps is changed', async () => {
    jest.useRealTimers();

    let loadingDelay: number | null = 1500;

    act(() => {
      hook = setUp(request, {
        loadingDelay,
      });
    });

    expect(hook.result.current.loading).toBe(false);

    loadingDelay = null;

    hook.rerender({
      loadingDelay,
    });

    await act(async () => {
      await sleep(1600);
    });

    expect(hook.result.current.loading).toBe(false);
  });
});
