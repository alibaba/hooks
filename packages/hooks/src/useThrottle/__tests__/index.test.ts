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

  it('useThrottle should work', async () => {
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
});
