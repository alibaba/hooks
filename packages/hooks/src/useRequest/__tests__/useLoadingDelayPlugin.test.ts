import { act, renderHook, waitFor } from '@testing-library/react';
import type { RenderHookResult } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useLoadingDelayPlugin', () => {
  jest.useFakeTimers();

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

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
});
