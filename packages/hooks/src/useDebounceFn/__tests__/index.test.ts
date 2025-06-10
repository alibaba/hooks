import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react';
import { sleep } from '../../utils/testingHelpers';
import useDebounceFn from '../index';

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

let hook: RenderHookResult<any, any>;

describe('useDebounceFn', () => {
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
      expect(count).toBe(6);
      hook.result.current.cancel();
      expect(count).toBe(6);
      await sleep(300);
      expect(count).toBe(6);

      hook.result.current.run(1);
      expect(count).toBe(6);
      hook.result.current.flush();
      expect(count).toBe(7);
      await sleep(300);
      expect(count).toBe(7);
    });
  });

  // it('should output error when fn is not a function', () => {
  //   const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  //   renderHook(() => useDebounceFn(1 as any));
  //   expect(errSpy).toBeCalledWith('useDebounceFn expected parameter is a function, got number');
  //   errSpy.mockRestore();
  // });
});
