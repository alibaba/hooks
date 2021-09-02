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
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});
    act(() => {
      hook = renderHook(
        ({ value, wait }) =>
          useThrottleEffect(
            () => {
              mockEffect();
              return () => {
                mockCleanUp();
              };
            },
            [value],
            { wait },
          ),
        { initialProps: { value: 1, wait: 200 } },
      );
    });

    await act(async () => {
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);

      hook.rerender({ value: 2, wait: 200 });
      await sleep(100);
      expect(mockEffect.mock.calls.length).toEqual(1);
      expect(mockCleanUp.mock.calls.length).toEqual(0);
      await sleep(150);
      expect(mockEffect.mock.calls.length).toEqual(2);
      expect(mockCleanUp.mock.calls.length).toEqual(1);

      hook.rerender({ value: 3, wait: 100 });
      await sleep(50);
      expect(mockEffect.mock.calls.length).toEqual(3);
      expect(mockCleanUp.mock.calls.length).toEqual(2);
      await sleep(100);
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
