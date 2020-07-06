import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { sleep } from '../../utils/testingHelpers';
import useInterval from '../index';

interface ParamsObj {
  fn: (...arg: any) => any;
  delay: number;
  options?: { immediate: boolean };
}

let count = 0;
const intervalFn = () => {
  count += 1;
};

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useInterval(fn, delay));

let hook: RenderHookResult<ParamsObj, any>;

describe('useInterval', () => {
  it('should be defined', () => {
    expect(useInterval).toBeDefined();
  });

  it('interval should work', async () => {
    act(() => {
      hook = setUp({
        fn: intervalFn,
        delay: 200,
      });
    });
    await act(async () => {
      await sleep(700);
      expect(count).toBe(3);
    });
  });
});
