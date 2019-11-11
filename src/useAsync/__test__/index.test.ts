import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';
import { DependencyList } from 'react';
import useAsync, { ReturnValue, Options } from '../index';

describe('useAsync', () => {
  const originalError = console.error;
  beforeAll(() => {
    jest.useFakeTimers();
    console.error = (...args: any) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });
  afterAll(() => {
    console.error = originalError;
  });

  const request = (req?: number) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (req === 0) {
          reject(new Error('fail'));
        } else {
          resolve('success');
        }
      }, 2000);
    });

  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  let hook: RenderHookResult<
    { func: (...args: any[]) => Promise<{}>; deps: DependencyList; opt: Options<{}> },
    ReturnValue<{}>
  >;

  it('hooks should auto run', async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    act(() => {
      hook = renderHook(
        ({ func }) =>
          useAsync(func, [], {
            onSuccess: successCallback,
            onError: errorCallback,
          }),
        {
          initialProps: {
            func: (req: number) => request(req),
          },
        },
      );
    });

    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toEqual(false);
    expect(hook.result.current.data).toEqual('success');
    expect(errorCallback).not.toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalled();

    act(() => {
      hook.result.current.run(0).catch(e => e);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalled();

    act(() => {
      hook.result.current.run(1);
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalledTimes(2);

    hook.unmount();
  });

  it('hooks should be manually triggered', async () => {
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    hook = renderHook(({ func, deps, opt }) => useAsync(func, deps, opt), {
      initialProps: {
        func: (req: number) => request(req),
        deps: [] as ReadonlyArray<{}>,
        opt: {
          manual: true,
          onSuccess: successCallback,
          onError: errorCallback,
        } as Options<{}>,
      },
    });

    const { run, loading } = hook.result.current;
    expect(loading).toEqual(false);
    act(() => {
      run(1);
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).not.toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalled();

    act(() => {
      run(0).catch(e => e);
    });
    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.loading).toEqual(false);
    expect(errorCallback).toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalled();

    hook.unmount();
  });

  it('timer should work with manual trigger', async () => {
    const callback = jest.fn();

    act(() => {
      hook = renderHook(({ func, deps, opt }) => useAsync(func, deps, opt), {
        initialProps: {
          func: (req: number) => {
            callback();
            return request(req);
          },
          deps: [] as ReadonlyArray<{}>,
          opt: {
            manual: true,
            pollingInterval: 3000,
          } as Options<{}>,
        },
      });
    });

    expect(hook.result.current.loading).toEqual(false);
    act(() => {
      // start the timer
      hook.result.current.run();
    });
    jest.runOnlyPendingTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(callback).toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.runAllTimers();
    // await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.timer.stop();
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.timer.resume();
    });
    jest.runAllTimers();
    // await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(4);
    hook.unmount();
  });

  it('timer should work with auto trigger', async () => {
    const callback = jest.fn();
    hook = renderHook(({ func, deps, opt }) => useAsync(func, deps, opt), {
      initialProps: {
        func: (req: number) => {
          callback();
          return request(req);
        },
        deps: [] as ReadonlyArray<{}>,
        opt: {
          pollingInterval: 3000,
        } as Options<{}>,
      },
    });

    expect(hook.result.current.loading).toEqual(true);
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');
    expect(hook.result.current.loading).toEqual(false);
    expect(callback).toHaveBeenCalled();

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(2);

    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.timer.pause();
    });
    expect(callback).toHaveBeenCalledTimes(3);

    act(() => {
      hook.result.current.timer.resume();
    });
    jest.runAllTimers();
    // await hook.waitForNextUpdate();
    expect(callback).toHaveBeenCalledTimes(4);
    hook.unmount();
  });

  it('unmount hook in onSuccess callback', async () => {
    const callback = jest.fn();
    let counter = 1;
    hook = renderHook(({ func, deps, opt }) => useAsync(func, deps, opt), {
      initialProps: {
        func: (req: number) => request(req),
        deps: [] as ReadonlyArray<{}>,
        opt: {
          onSuccess: () => {
            if (counter === 1) {
              counter += 1;
            } else {
              hook.unmount();
            }
          },
          manual: true,
        } as Options<{}>,
      },
    });
    expect(hook.result.current.loading).toEqual(false);

    act(() => {
      hook.result.current.run(1);
    });
    jest.runAllTimers();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toEqual('success');

    act(() => {
      hook.result.current.run(1).then(res => callback());
    });
    // hook already unmount
    expect(callback).not.toHaveBeenCalled();
  });
});
