import { act, renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useRefreshOnWindowFocusPlugin from '../src/plugins/useRefreshOnWindowFocusPlugin';
import useRequest from '../index';

describe('useRefreshOnWindowFocusPlugin', () => {
  it('should be defined', () => {
    expect(useRefreshOnWindowFocusPlugin).toBeDefined();
  });

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

  const setUp = (service, options, plugins) =>
    renderHook((o) => useRequest(service, o || options, plugins));

  let hook;
  it('useRefreshOnWindowFocusPlugin should work', async () => {
    act(() => {
      hook = setUp(
        request,
        {
          refreshOnWindowFocus: true,
          focusTimespan: 5000,
        },
        useRefreshOnWindowFocusPlugin,
      );
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.advanceTimersByTime(1001);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    fireEvent.focus(window);
    expect(hook.result.current.loading).toEqual(true);
    jest.advanceTimersByTime(2000);
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);

    jest.advanceTimersByTime(3000);
    fireEvent.focus(window);
    expect(hook.result.current.loading).toEqual(true);
    hook.unmount();
  });
});
