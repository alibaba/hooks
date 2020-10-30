import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useDebounceFn from '../index';
import { sleep } from '../../utils/testingHelpers';

interface ParamsObj {
  fn: (...arg: any) => any;
  deps?: any[];
  wait: number;
}

let count = 0;
const debounceFn = (gap: number) => {
  count += gap;
};

const setUp = ({ fn, wait }: ParamsObj) => renderHook(() => useDebounceFn(fn, { wait }));

let hook: RenderHookResult<ParamsObj, ReturnType<typeof useDebounceFn>>;

describe('useDebounceFn', () => {
  it('should be defined', () => {
    expect(useDebounceFn).toBeDefined();
  });

  it('run, cancel and flush should work', async () => {
    act(() => {
      hook = setUp({
        fn: debounceFn,
        wait: 200,
      });
    });
    await act(async () => {
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      hook.result.current.run(2);
      expect(count).toBe(0);
      await sleep(300);
      expect(count).toBe(2);
      hook.result.current.run(4);
      expect(count).toBe(2);
      await sleep(300);
      expect(count).toBe(6);
      hook.result.current.run(4);
      hook.result.current.cancel();
      await sleep(300);
      expect(count).toBe(6);
      hook.result.current.run(1);
      hook.result.current.flush();
      expect(count).toBe(7);
      await sleep(300);
      expect(count).toBe(7);
    });
  });
});
