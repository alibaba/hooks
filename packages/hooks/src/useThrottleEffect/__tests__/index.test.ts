import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useThrottleEffect from '../index';
import { sleep } from '../../utils/testingHelpers';

interface ParamsObj {
  value: any;
  wait: number;
}

let hook: RenderHookResult<ParamsObj, any>;

describe('useThrottleEffect', () => {
  it('should be defined', () => {
    expect(useThrottleEffect).toBeDefined();
  });

  it('useThrottleEffect should work', async () => {
    let mountedState = 1;
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});
    act(() => {
      hook = renderHook(() =>
        useThrottleEffect(
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
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);

      mountedState = 2;
      hook.rerender();
      await sleep(300);
      expect(mockEffect.mock.calls.length).toEqual(2);
      expect(mockCleanUp.mock.calls.length).toEqual(1);

      mountedState = 3;
      hook.rerender();
      expect(mockEffect.mock.calls.length).toEqual(2);
      expect(mockCleanUp.mock.calls.length).toEqual(1);

      await sleep(300);
      expect(mockEffect.mock.calls.length).toEqual(3);
      expect(mockCleanUp.mock.calls.length).toEqual(2);
    });
  });

  it('should cancel timeout on unmount', async () => {
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});

    const hook = renderHook(
      (props) =>
        useThrottleEffect(
          () => {
            mockEffect();
            return () => {
              mockCleanUp();
            };
          },
          [props],
          { wait: 200 },
        ),
      { initialProps: 0 },
    );

    await act(async () => {
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);

      hook.rerender(1);
      await sleep(50);
      hook.unmount();

      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(1);
    });
  });
});
