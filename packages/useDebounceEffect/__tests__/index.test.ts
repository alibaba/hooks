import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useDebounceEffect from '../index';
import { sleep } from '../../utils/testingHelpers';

interface ParamsObj {
  value: any;
  wait: number;
}

let hook: RenderHookResult<ParamsObj, any>;

describe('useDebounceEffect', () => {
  it('should be defined', () => {
    expect(useDebounceEffect).toBeDefined();
  });

  it('useDebounceEffect should work', async () => {
    let mountedState = 1;
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});
    act(() => {
      hook = renderHook(() =>
        useDebounceEffect(
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
      mountedState = 2;
      hook.rerender();
      await sleep(50);
      mountedState = 3;
      hook.rerender();
      expect(mockEffect.mock.calls.length).toEqual(0);
      expect(mockCleanUp.mock.calls.length).toEqual(0);
      await sleep(300);
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);
      mountedState = 4;
      hook.rerender();
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);
      await sleep(300);
      expect(mockEffect.mock.calls.length).toEqual(2);
      expect(mockCleanUp.mock.calls.length).toEqual(1);
    });
  });
});
