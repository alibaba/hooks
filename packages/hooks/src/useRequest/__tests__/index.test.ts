import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import useRequest from '../index';
import { request } from '../../utils/testingHelpers';

const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

describe('useRequest', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  const setUp = (
    service: Parameters<typeof useRequest>[0],
    options: Parameters<typeof useRequest>[1],
  ) => renderHook((o) => useRequest(service, o || options));

  let hook: RenderHookResult<any, any>;

  it('useRequest should auto run', async () => {
    let value;
    let success;
    const successCallback = (text: string) => {
      success = text;
    };
    const errorCallback = jest.fn();
    const beforeCallback = () => {
      value = 'before';
    };
    const finallyCallback = () => {
      value = 'finally';
    };
    // auto run success
    act(() => {
      hook = setUp(request, {
        onSuccess: successCallback,
        onError: errorCallback,
        onBefore: beforeCallback,
        onFinally: finallyCallback,
      });
    });
    expect(hook.result.current.loading).toBe(true);
    expect(value).toBe('before');
    expect(success).toBeUndefined();

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(success).toBe('success');
    expect(hook.result.current.data).toBe('success');
    expect(value).toBe('finally');
    expect(errorCallback).toHaveBeenCalledTimes(0);

    //manual run fail
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.error).toEqual(new Error('fail')));
    expect(hook.result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(1);

    //manual run success
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    expect(hook.result.current.data).toBe('success');
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(errorCallback).toHaveBeenCalledTimes(1);
    hook.unmount();

    //auto run fail
    act(() => {
      hook = setUp(() => request(0), {
        onSuccess: successCallback,
        onError: errorCallback,
      });
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.error).toEqual(new Error('fail')));
    expect(hook.result.current.loading).toBe(false);
    expect(errorCallback).toHaveBeenCalledTimes(2);
    hook.unmount();
  });

  it('useRequest should be manually triggered', async () => {
    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    expect(hook.result.current.loading).toBe(false);
    act(() => {
      hook.result.current.run(1);
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.data).toBe('success');
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.error).toEqual(new Error('fail'));
    hook.unmount();
  });

  it('useRequest runAsync should work', async () => {
    let success = '',
      error = '';

    act(() => {
      hook = setUp(request, {
        manual: true,
      });
    });
    act(() => {
      hook.result.current
        .runAsync(0)
        .then((res) => {
          success = res;
        })
        .catch((err) => {
          error = err;
        });
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(success).toBe('');
    await waitFor(() => expect(error).toEqual(new Error('fail')));
    success = '';
    error = '';
    act(() => {
      hook.result.current
        .runAsync(1)
        .then((res) => {
          success = res;
        })
        .catch((err) => {
          error = err;
        });
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(success).toBe('success'));
    expect(error).toBe('');
    hook.unmount();
  });

  it('useRequest mutate should work', async () => {
    act(() => {
      hook = setUp(request, {});
    });

    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(hook.result.current.data).toBe('success'));
    act(() => {
      hook.result.current.mutate('hello');
    });
    expect(hook.result.current.data).toBe('hello');
    hook.unmount();
  });

  it('useRequest defaultParams should work', async () => {
    act(() => {
      hook = setUp(request, {
        defaultParams: [1, 2, 3],
      });
    });
    expect(hook.result.current.loading).toBe(true);

    act(() => {
      jest.runAllTimers();
    });
    expect(hook.result.current.params).toEqual([1, 2, 3]);
    await waitFor(() => expect(hook.result.current.data).toBe('success'));
    expect(hook.result.current.loading).toBe(false);
    hook.unmount();
  });
});
