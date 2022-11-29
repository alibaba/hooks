import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react';
import useDebounceEffect from '../index';
import { sleep } from '../../utils/testingHelpers';

let hook: RenderHookResult<any, any>;

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

    expect(mockEffect.mock.calls.length).toEqual(0);
    expect(mockCleanUp.mock.calls.length).toEqual(0);
    mountedState = 2;
    hook.rerender();
    await sleep(50);
    mountedState = 3;
    hook.rerender();
    expect(mockEffect.mock.calls.length).toEqual(0);
    expect(mockCleanUp.mock.calls.length).toEqual(0);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toEqual(1);
    expect(mockCleanUp.mock.calls.length).toEqual(0);
    mountedState = 4;
    hook.rerender();
    expect(mockEffect.mock.calls.length).toEqual(1);
    expect(mockCleanUp.mock.calls.length).toEqual(0);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toEqual(2);
    expect(mockCleanUp.mock.calls.length).toEqual(1);
  });

  it('should cancel timeout on unmount', async () => {
    const mockEffect = jest.fn(() => {});
    const mockCleanUp = jest.fn(() => {});

    const renderHooks = renderHook(
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

    expect(mockEffect.mock.calls.length).toEqual(0);
    expect(mockCleanUp.mock.calls.length).toEqual(0);

    renderHooks.rerender(1);
    await sleep(50);
    expect(mockEffect.mock.calls.length).toEqual(0);
    expect(mockCleanUp.mock.calls.length).toEqual(0);

    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toEqual(1);
    expect(mockCleanUp.mock.calls.length).toEqual(0);

    renderHooks.rerender(2);
    await act(async () => {
      await sleep(300);
    });
    expect(mockEffect.mock.calls.length).toEqual(2);
    expect(mockCleanUp.mock.calls.length).toEqual(1);

    renderHooks.unmount();
    expect(mockEffect.mock.calls.length).toEqual(2);
    expect(mockCleanUp.mock.calls.length).toEqual(2);
  });
});
