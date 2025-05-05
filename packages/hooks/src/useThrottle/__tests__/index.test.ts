import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react';
import useThrottle from '../index';
import { sleep } from '../../utils/testingHelpers';

let hook: RenderHookResult<any, any>;

describe('useThrottle', () => {
  it('default useThrottle should work', async () => {
    let mountedState = 1;
    act(() => {
      hook = renderHook(() => useThrottle(mountedState, { wait: 500 }));
    });

    expect(hook.result.current).toBe(1);
    mountedState = 2;
    hook.rerender();
    mountedState = 3;
    hook.rerender();
    await act(async () => {
      await sleep(250);
    });
    expect(hook.result.current).toBe(1);
    mountedState = 4;
    hook.rerender();
    await act(async () => {
      await sleep(260);
    });
    expect(hook.result.current).toBe(4);
  });

  it('leading:false & trailing:false of options useThrottle should work', async () => {
    let mountedState = 0;
    act(() => {
      hook = renderHook(() =>
        useThrottle(mountedState, {
          wait: 500,
          leading: false,
          trailing: false,
        }),
      );
    });

    //Never get the latest value
    mountedState = 1;
    expect(hook.result.current).toBe(0);
    mountedState = 2;
    hook.rerender();
    mountedState = 3;
    hook.rerender();
    await sleep(250);
    expect(hook.result.current).toBe(0);
    mountedState = 4;
    hook.rerender();
    await sleep(260);
    expect(hook.result.current).toBe(0);
  });

  it('leading:true & trailing:false of options useThrottle should work', async () => {
    let mountedState = 0;
    act(() => {
      hook = renderHook(() =>
        useThrottle(mountedState, { wait: 500, leading: true, trailing: false }),
      );
    });

    expect(hook.result.current).toBe(0);
    mountedState = 1;
    hook.rerender();
    await sleep(0);
    expect(hook.result.current).toBe(0);

    mountedState = 2;
    await sleep(200);
    hook.rerender();
    await sleep(0);
    expect(hook.result.current).toBe(0);

    mountedState = 3;
    //Need to wait more than 500ms to get the latest value
    await act(async () => {
      await sleep(300);
    });
    hook.rerender();
    await sleep(0);
    expect(hook.result.current).toBe(3);
  });

  it('leading:false & trailing:true of options useThrottle should work', async () => {
    let mountedState = 0;
    act(() => {
      hook = renderHook(() =>
        useThrottle(mountedState, { wait: 500, leading: false, trailing: true }),
      );
    });

    expect(hook.result.current).toBe(0);
    mountedState = 1;
    hook.rerender();
    await sleep(0);
    expect(hook.result.current).toBe(0);

    mountedState = 2;
    hook.rerender();
    await sleep(250);
    expect(hook.result.current).toBe(0);

    mountedState = 3;
    hook.rerender();
    await act(async () => {
      await sleep(260);
    });
    await sleep(260);
    expect(hook.result.current).toBe(3);
  });
});
