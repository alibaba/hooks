import { act, renderHook } from '@testing-library/react';
import useDebounceEffect from '../index';
import { sleep } from '../../utils/testingHelpers';

let hook;

describe('useDebounceEffect', () => {
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

    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    mountedState = 2;
    hook.rerender();
    await sleep(50);
    mountedState = 3;
    hook.rerender();
    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    mountedState = 4;
    hook.rerender();
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(1);
  });

  it('should cancel timeout on unmount', async () => {
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});

    const hook = renderHook(
      (props) =>
        useDebounceEffect(
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

    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);

    hook.rerender(1);
    await sleep(50);
    expect(mockEffect.mock.calls.length).toBe(0);
    expect(mockCleanUp.mock.calls.length).toBe(0);

    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(1);
    expect(mockCleanUp.mock.calls.length).toBe(0);

    hook.rerender(2);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(1);

    hook.unmount();
    expect(mockEffect.mock.calls.length).toBe(2);
    expect(mockCleanUp.mock.calls.length).toBe(2);
  });
});
