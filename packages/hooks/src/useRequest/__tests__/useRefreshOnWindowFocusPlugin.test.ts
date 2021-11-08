import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useRequest from '../index';

describe('useRefreshOnWindowFocusPlugin', () => {
  const request = (req) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (req === 0) {
          reject(new Error('fail'));
        } else {
          resolve('success');
        }
      }, 1000),
    );

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
});
