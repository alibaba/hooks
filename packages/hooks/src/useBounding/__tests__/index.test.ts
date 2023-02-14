import { act, renderHook } from '@testing-library/react';
import type { RenderHookResult } from '@testing-library/react';
import useBounding, { INIT_BOUNDING_RECT } from '../index';
import type { Target, UseBoundingOptions, UseBoundingRect } from '../index';

describe('useBounding', () => {
  const INIT_VALUE = {
    width: 200,
    height: 200,
    left: 100,
    right: 500,
    top: 100,
    bottom: 500,
    x: 100,
    y: 100,
  } as DOMRect;

  let windowAddEventListenerMock: any = {};
  let resizeObserverMock: jest.Mock<any, any, any>;
  let target: HTMLTextAreaElement;
  let targetRectMock: jest.SpyInstance<DOMRect, [], any>;
  let hook: RenderHookResult<UseBoundingRect, unknown>;

  beforeEach(() => {
    jest.spyOn(window, 'addEventListener').mockImplementation(
      jest.fn((event, callback) => {
        windowAddEventListenerMock[event] = callback;
      }),
    );

    window.ResizeObserver = resizeObserverMock = jest.fn().mockReturnValue({
      observe: () => null,
      disconnect: () => null,
    });

    target = document.createElement('textarea');
    targetRectMock = jest.spyOn(target, 'getBoundingClientRect').mockReturnValue(INIT_VALUE);
  });

  afterEach(() => {
    windowAddEventListenerMock = {};
    resizeObserverMock.mockRestore();
    targetRectMock.mockRestore();
    hook.unmount();
  });

  function triggerResize() {
    // `ResizeObserver` API will call once on component mounted
    const calls = resizeObserverMock.mock.calls;
    const [resizeObserverCallback] = calls[calls.length - 1];

    act(() => resizeObserverCallback());
  }

  function setup(el: Target, options?: UseBoundingOptions) {
    const res = renderHook(() => useBounding(el, options));

    if (el) triggerResize();

    return res;
  }

  it('should work with target', async () => {
    hook = setup(target);
    expect(hook.result.current).toEqual(INIT_VALUE);
  });

  it('should return initial values when target is null', () => {
    hook = setup(null);
    expect(hook.result.current).toEqual(INIT_BOUNDING_RECT);
  });

  it('should work when the size of target changes', () => {
    hook = setup(target);
    // Simulate the size change of the target
    targetRectMock.mockReturnValue({ ...INIT_VALUE, width: 10, height: 10 });
    triggerResize();
    expect(hook.result.current).toEqual({ ...INIT_VALUE, width: 10, height: 10 });
  });

  it('should reset when unmount', async () => {
    hook = setup(target);
    expect(hook.result.current).toEqual(INIT_VALUE);
    hook.unmount();
    // TODO: 卸载后拿不到 hook 重置后的值
    expect(hook.result.current).toEqual(INIT_BOUNDING_RECT);
  });

  it('should work when the size of window changes', async () => {
    hook = setup(target);
    targetRectMock.mockReturnValue({ ...INIT_VALUE, width: 10, height: 10 });
    act(() => windowAddEventListenerMock.resize());
    expect(hook.result.current).toEqual({ ...INIT_VALUE, width: 10, height: 10 });
  });

  it('should work when the window scrolls', () => {
    hook = setup(target);
    targetRectMock.mockReturnValue({ ...INIT_VALUE, width: 10, height: 10 });
    act(() => windowAddEventListenerMock.scroll());
    expect(hook.result.current).toEqual({ ...INIT_VALUE, width: 10, height: 10 });
  });

  it('should disconnect when unmount', async () => {
    const disconnect = jest.fn();

    resizeObserverMock.mockReturnValue({
      observe: () => null,
      disconnect,
    });
    hook = setup(target);
    hook.unmount();
    expect(disconnect).toBeCalled();
  });
});
