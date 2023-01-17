import { act, renderHook, fireEvent, waitFor } from '@testing-library/react';
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
    await waitFor(() => expect(hook.result.current.loading).toEqual(false));
    act(() => {
      fireEvent.focus(document);
    });
    expect(hook.result.current.loading).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    await waitFor(() => expect(hook.result.current.loading).toEqual(false));
    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(document);
    });
    expect(hook.result.current.loading).toEqual(true);
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
    await waitFor(() => expect(hook1.result.current.loading).toEqual(false));
    expect(hook2.result.current.loading).toEqual(false);

    act(() => {
      fireEvent.focus(document);
    });

    expect(hook1.result.current.loading).toEqual(true);
    expect(hook2.result.current.loading).toEqual(true);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => expect(hook1.result.current.loading).toEqual(false));
    expect(hook2.result.current.loading).toEqual(false);

    hook1.unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
      fireEvent.focus(document);
    });

    expect(hook1.result.current.loading).toEqual(false);
    // hook2 should not unsubscribe
    expect(hook2.result.current.loading).toEqual(true);
  });

  it('feat: support subscribe to certain kind of event - visibilitychange', async () => {
    const service = jest.fn();
    service.mockImplementation(request);
    act(() => {
      hook = setUp(service, {
        refreshOnWindowFocus: true,
        focusTimespan: 5000,
        focusEvents: ['visibilitychange'],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    await waitFor(() => !hook.result.current.loading);
    expect(service).toBeCalledTimes(1);
    document.dispatchEvent(new Event('visibilitychange'));
    await waitFor(() => hook.result.current.loading);
    expect(service).toBeCalledTimes(2);
    act(() => {
      jest.advanceTimersByTime(6000);
      fireEvent.focus(document);
    });
    // focus should not trigger service
    expect(service).toBeCalledTimes(2);
  });

  it('feat: support subscribe to certain kind of event - focus', async () => {
    const service = jest.fn();
    service.mockImplementation(request);
    act(() => {
      hook = setUp(service, {
        refreshOnWindowFocus: true,
        focusTimespan: 5000,
        focusEvents: ['focus'],
      });
    });
    expect(hook.result.current.loading).toEqual(true);
    await waitFor(() => !hook.result.current.loading);
    expect(service).toBeCalledTimes(1);
    fireEvent.focus(document);
    await waitFor(() => hook.result.current.loading);
    expect(service).toBeCalledTimes(2);
    act(() => {
      jest.advanceTimersByTime(6000);
      document.dispatchEvent(new Event('visibilitychange'));
    });
    // visibilitychange should not trigger service
    expect(service).toBeCalledTimes(2);
  });
});
