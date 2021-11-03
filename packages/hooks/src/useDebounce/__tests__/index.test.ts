import { act, renderHook } from '@testing-library/react-hooks';
import useDebounce from '../index';
import { sleep } from '../../utils/testingHelpers';

describe('useDebounce', () => {
  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('useDebounce wait:200ms', async () => {
    let mountedState = 0;
    const { result, rerender } = renderHook(() => useDebounce(mountedState, { wait: 200 }));
    expect(result.current).toEqual(0);

    await act(async () => {
      mountedState = 1;
      rerender();
      await sleep(50);
      expect(result.current).toEqual(0);

      mountedState = 2;
      rerender();
      await sleep(100);
      expect(result.current).toEqual(0);

      mountedState = 3;
      rerender();
      await sleep(150);
      expect(result.current).toEqual(0);

      mountedState = 4;
      rerender();
      await sleep(250);
      expect(result.current).toEqual(4);
    });
  });
});
