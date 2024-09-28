import { act, renderHook, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';
import { Trigger } from '../src/types';

describe('useRefreshOnWindowFocusPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('useRefreshOnWindowFocusPlugin should work, trigger should be correct', async () => {
    let triggerValue;
    const beforeCallback = (_, trigger) => {
      triggerValue = trigger;
    };
    act(() => {
      hook = setUp(request, {
        refreshOnWindowFocus: true,
        onBefore: beforeCallback,
        focusTimespan: 5000,
      });
    });
    expect(hook.result.current.loading).toBe(true);
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    act(() => {
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toBe(true);
    expect(triggerValue).toBe(Trigger.REFRESH_ON_WINDOW_FOCUS);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toBe(true);
  });

  it('fix: multiple unsubscriptions should not delete the last subscription listener ', async () => {
    let hook1;
    let hook2;
    act(() => {
      hook1 = setUp(request, {
        refreshOnWindowFocus: true,
      });
      hook2 = setUp(request, {
        refreshOnWindowFocus: true,
      });
    });

    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true);

    act(() => {
      jest.advanceTimersByTime(1001);
    });
    await waitFor(() => expect(hook1.result.current.loading).toBe(false));
    expect(hook2.result.current.loading).toBe(false);

    act(() => {
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toBe(true);
    expect(hook2.result.current.loading).toBe(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => expect(hook1.result.current.loading).toBe(false));
    expect(hook2.result.current.loading).toBe(false);

    hook1.unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toBe(false);
    // hook2 should not unsubscribe
    expect(hook2.result.current.loading).toBe(true);
  });
});
