import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

describe('useRefreshOnWindowFocusPlugin', () => {
  jest.useFakeTimers();

  const setUp = (service, options) => renderHook((o) => useRequest(service, o || options));

  let hook;
  it('useRefreshOnWindowFocusPlugin should work', async () => {
    act(() => {
      hook = setUp(request, {
        refreshOnWindowFocus: true,
        focusTimespan: 5000,
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    act(() => {
      jest.advanceTimersByTime(1001);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });
    expect(hook.result.current.loading).toEqual(true);
    hook.unmount();
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

    expect(hook1.result.current.loading).toEqual(true);
    expect(hook2.result.current.loading).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(1001);
    });
    await hook1.waitForNextUpdate();
    expect(hook1.result.current.loading).toEqual(false);
    expect(hook2.result.current.loading).toEqual(false);

    act(() => {
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toEqual(true);
    expect(hook2.result.current.loading).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await hook1.waitForNextUpdate();

    expect(hook1.result.current.loading).toEqual(false);
    expect(hook2.result.current.loading).toEqual(false);

    hook1.unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(window);
    });

    expect(hook1.result.current.loading).toEqual(false);
    // hook2 should not unsubscribe
    expect(hook2.result.current.loading).toEqual(true);
  });
});
