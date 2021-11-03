import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useThrottle from '../index';
import { sleep } from '../../utils/testingHelpers';

interface ParamsObj {
  value: any;
  wait: number;
}

let hook: RenderHookResult<ParamsObj, any>;

describe('useThrottle', () => {
  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('default useThrottle should work', async () => {
    let mountedState = 1;
    act(() => {
      hook = renderHook(() => useThrottle(mountedState, { wait: 500 }));
    });
    await act(async () => {
      expect(hook.result.current).toEqual(1);
      mountedState = 2;
      hook.rerender();
      mountedState = 3;
      hook.rerender();
      await sleep(250);
      expect(hook.result.current).toEqual(1);
      mountedState = 4;
      hook.rerender();
      await sleep(260);
      expect(hook.result.current).toEqual(4);
    });
  });

  it('leading:false & trailing:false of options useThrottle should work', async () => {
    let mountedState = 0;
    act(() => {
      hook = renderHook(() =>
        useThrottle(mountedState, { wait: 500, leading: false, trailing: false }),
      );
    });
    await act(async () => {
      //Never get the latest value
      mountedState = 1;
      expect(hook.result.current).toEqual(0);
      mountedState = 2;
      hook.rerender();
      mountedState = 3;
      hook.rerender();
      await sleep(250);
      expect(hook.result.current).toEqual(0);
      mountedState = 4;
      hook.rerender();
      await sleep(260);
      expect(hook.result.current).toEqual(0);
    });
  });

  it('leading:true & trailing:false of options useThrottle should work', async () => {
    let mountedState = 0;
    act(() => {
      hook = renderHook(() =>
        useThrottle(mountedState, { wait: 500, leading: true, trailing: false }),
      );
    });
    await act(async () => {
      expect(hook.result.current).toEqual(0);
      mountedState = 1;
      hook.rerender();
      await sleep(0);
      expect(hook.result.current).toEqual(0);

      mountedState = 2;
      await sleep(200);
      hook.rerender();
      await sleep(0);
      expect(hook.result.current).toEqual(0);

      mountedState = 3;
      //Need to wait more than 500ms to get the latest value
      await sleep(300);
      hook.rerender();
      await sleep(0);
      expect(hook.result.current).toEqual(3);
    });
  });

  it('leading:false & trailing:true of options useThrottle should work', async () => {
    let mountedState = 0;
    act(() => {
      hook = renderHook(() =>
        useThrottle(mountedState, { wait: 500, leading: false, trailing: true }),
      );
    });
    await act(async () => {
      expect(hook.result.current).toEqual(0);
      mountedState = 1;
      hook.rerender();
      await sleep(0);
      expect(hook.result.current).toEqual(0);

      mountedState = 2;
      hook.rerender();
      await sleep(250);
      expect(hook.result.current).toEqual(0);

      mountedState = 3;
      hook.rerender();
      await sleep(260);
      expect(hook.result.current).toEqual(3);
    });
  });
});
