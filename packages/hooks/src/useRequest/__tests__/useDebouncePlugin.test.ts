import { act, renderHook } from '@testing-library/react-hooks';
import useDebouncePlugin from '../src/plugins/useDebouncePlugin';
import useRequest from '../index';

describe('useDebouncePlugin', () => {
  it('should be defined', () => {
    expect(useDebouncePlugin).toBeDefined();
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
  it('useDebouncePlugin should work', async () => {
    const callback = jest.fn();

    act(() => {
      hook = setUp(
        () => {
          callback();
          return request({});
        },
        {
          manual: true,
          debounceWait: 100,
        },
        useDebouncePlugin,
      );
    });

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.run(3);
      jest.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      hook.result.current.run(1);
      jest.advanceTimersByTime(50);
      hook.result.current.run(2);
      jest.advanceTimersByTime(50);
      hook.result.current.run(3);
      jest.advanceTimersByTime(50);
      hook.result.current.run(4);
    });

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });
});
