import { act, renderHook } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';
import useBounding, { INIT_BOUNDING_RECT } from '../index';

window.ResizeObserver = ResizeObserver;

const windowListenerMock: any = {};
const getBoundingClientRectMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
jest
  .spyOn(window, 'addEventListener')
  .mockImplementation(
    jest.fn((event: any, callback: any) => (windowListenerMock[event] = callback)),
  );
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

describe('useBounding', () => {
  it('should work with target', async () => {
    const hook = renderHook(() => useBounding(document.body));
    expect(hook.result.current).toEqual(INIT_BOUNDING_RECT);
  });

  it('should return initial values when target is null', () => {
    const hook = renderHook(() => useBounding(null));
    expect(hook.result.current).toEqual(INIT_BOUNDING_RECT);
  });

  it('should work when window is resizing', async () => {
    getBoundingClientRectMock.mockReturnValue(INIT_VALUE);
    const target = document.createElement('div');
    const hook = renderHook(() => useBounding(target));
    expect(hook.result.current).toEqual(INIT_VALUE);

    getBoundingClientRectMock.mockReturnValue({ ...INIT_VALUE, width: 100, height: 100 });
    // `useBounding` will not update before `window.onresize` triggers.
    expect(hook.result.current).toEqual({ ...INIT_VALUE });
    act(() => windowListenerMock.resize());
    // `useBounding` will update after `window.onresize` triggers.
    expect(hook.result.current).toEqual({ ...INIT_VALUE, width: 100, height: 100 });
    getBoundingClientRectMock.mockClear();
  });

  it('should work when window is scrolling', () => {
    getBoundingClientRectMock.mockReturnValue(INIT_VALUE);
    const target = document.createElement('div');
    const hook = renderHook(() => useBounding(target));
    expect(hook.result.current).toEqual(INIT_VALUE);

    getBoundingClientRectMock.mockReturnValue({ ...INIT_VALUE, width: 100, height: 100 });
    // `useBounding` will not update before `window.onscroll` triggers.
    expect(hook.result.current).toEqual({ ...INIT_VALUE });
    act(() => windowListenerMock.scroll());
    // `useBounding` will update after `window.onscroll` triggers.
    expect(hook.result.current).toEqual({ ...INIT_VALUE, width: 100, height: 100 });
    getBoundingClientRectMock.mockClear();
  });

  it('should disconnect when unmount', async () => {
    const resizeObserverMock = jest.fn().mockReturnValue({
      observe: () => null,
      disconnect: () => null,
    });
    const disconnect = jest.fn();
    resizeObserverMock.mockReturnValue({
      observe: () => null,
      disconnect,
    });
    window.ResizeObserver = resizeObserverMock;

    const target = document.createElement('div');
    const hook = renderHook(() => useBounding(target));
    hook.unmount();
    expect(disconnect).toBeCalled();

    resizeObserverMock.mockClear();
    disconnect.mockClear();
    window.ResizeObserver = ResizeObserver;
  });
});
