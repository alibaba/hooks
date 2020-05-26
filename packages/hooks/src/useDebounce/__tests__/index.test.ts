import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useDebounce from '../index';

interface ParamsObj {
  value: any;
  wait: number;
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  });
}

let hook: RenderHookResult<ParamsObj, any>;

describe('useDebounce', () => {
  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('useDebounce should work', async () => {
    let mountedState = 1;
    act(() => {
      hook = renderHook(() => useDebounce(mountedState, {wait: 200}));
    });
    await act(async () => {
      expect(hook.result.current).toEqual(1);
      mountedState = 2;
      hook.rerender();
      mountedState = 3;
      hook.rerender();
      await sleep(300);
      expect(hook.result.current).toEqual(3);
      mountedState = 4;
      hook.rerender();
      expect(hook.result.current).toEqual(3);
      await sleep(300);
      expect(hook.result.current).toEqual(4);
    });
  });
});
