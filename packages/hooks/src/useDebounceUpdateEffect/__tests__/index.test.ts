import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useDebounceUpdateEffect from '../index';
import { sleep } from '../../utils/testingHelpers';

interface ParamsObj {
  value: any;
  wait: number;
}

let hook: RenderHookResult<ParamsObj, any>;

describe('useDebounceUpdateEffect', () => {
  it('should be defined', () => {
    expect(useDebounceUpdateEffect).toBeDefined();
  });

  it('useDebounceUpdateEffect should work', async () => {
    let mountedState = 1;
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});
    act(() => {
      hook = renderHook(() =>
        useDebounceUpdateEffect(
          () => {
            mockEffect();
            return () => {
              mockCleanUp();
            };
          },
          [mountedState],
          { wait: 200 },
        ),
      );
    });

    await act(async () => {
      expect(mockEffect.mock.calls.length).toEqual(0);
      expect(mockCleanUp.mock.calls.length).toEqual(0);
      await sleep(300);
      hook.rerender();
      // mockEffect should not be called after mount
      expect(mockEffect.mock.calls.length).toEqual(0);
      expect(mockCleanUp.mock.calls.length).toEqual(0);

      // after dependency updated, mockEffect should be called
      mountedState = 2;
      hook.rerender();
      await sleep(50);
      expect(mockEffect.mock.calls.length).toEqual(0);
      expect(mockCleanUp.mock.calls.length).toEqual(0);
      await sleep(300);
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);

      mountedState = 3;
      hook.rerender();
      await sleep(300);
      expect(mockEffect.mock.calls.length).toEqual(2);
      expect(mockCleanUp.mock.calls.length).toEqual(1);
    });
  });
});
