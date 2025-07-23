import { renderHook } from '@testing-library/react';
import useLongPress from '../index';
import type { Options } from '../index';

const mockCallback = jest.fn();
const mockClickCallback = jest.fn();
const mockLongPressEndCallback = jest.fn();

let events: Record<string, (event?: any) => void> = {};

const mockTarget = {
  addEventListener: jest.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: jest.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
  setPointerCapture: jest.fn(),
};

// 模拟 PointerEvent
const createPointerEvent = (
  type: string,
  pointerId = 1,
  clientX = 0,
  clientY = 0,
): PointerEvent => {
  return {
    type,
    pointerId,
    clientX,
    clientY,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  } as unknown as PointerEvent;
};

const setup = (onLongPress: any, target, options?: Options) =>
  renderHook(() => useLongPress(onLongPress, target, options));

describe('useLongPress', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    events = {};
    jest.useRealTimers();
  });

  it('longPress callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();

    const pointerDownEvent = createPointerEvent('pointerdown');
    events.pointerdown(pointerDownEvent);
    expect(mockTarget.setPointerCapture).toBeCalledWith(pointerDownEvent.pointerId);

    jest.advanceTimersByTime(350);

    const pointerCancelEvent = createPointerEvent('pointercancel', pointerDownEvent.pointerId);
    events.pointercancel(pointerCancelEvent);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockLongPressEndCallback).toBeCalledTimes(1);
    expect(mockClickCallback).toBeCalledTimes(0);
  });

  it('click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();

    const pointerDown1 = createPointerEvent('pointerdown', 1);
    events.pointerdown(pointerDown1);

    const pointerUp1 = createPointerEvent('pointerup', 1);
    events.pointerup(pointerUp1);

    const pointerDown2 = createPointerEvent('pointerdown', 2);
    events.pointerdown(pointerDown2);

    const pointerUp2 = createPointerEvent('pointerup', 2);
    events.pointerup(pointerUp2);

    expect(mockCallback).toBeCalledTimes(0);
    expect(mockLongPressEndCallback).toBeCalledTimes(0);
    expect(mockClickCallback).toBeCalledTimes(2);
  });

  it('longPress and click callback correct', () => {
    setup(mockCallback, mockTarget, {
      onClick: mockClickCallback,
      onLongPressEnd: mockLongPressEndCallback,
    });
    expect(mockTarget.addEventListener).toBeCalled();

    const longPressDown = createPointerEvent('pointerdown', 1);
    events.pointerdown(longPressDown);
    jest.advanceTimersByTime(350);

    const longPressUp = createPointerEvent('pointerup', 1);
    events.pointerup(longPressUp);

    const clickDown = createPointerEvent('pointerdown', 2);
    events.pointerdown(clickDown);

    const clickUp = createPointerEvent('pointerup', 2);
    events.pointerup(clickUp);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockLongPressEndCallback).toBeCalledTimes(1);
    expect(mockClickCallback).toBeCalledTimes(1);
  });

  it('onLongPress should not be called when over the threshold', () => {
    const { unmount } = setup(mockCallback, mockTarget, {
      moveThreshold: {
        x: 30,
        y: 20,
      },
    });
    expect(events.pointermove).toBeDefined();

    const pointerDown = createPointerEvent('pointerdown', 1, 0, 0);
    events.pointerdown(pointerDown);

    const pointerMove = createPointerEvent('pointermove', 1, 40, 10);
    events.pointermove(pointerMove);

    jest.advanceTimersByTime(320);
    expect(mockCallback).not.toBeCalled();

    unmount();
    expect(events.pointermove).toBeUndefined();
  });

  it('should handle multiple pointer interactions correctly', () => {
    setup(mockCallback, mockTarget);

    const pointer1Down = createPointerEvent('pointerdown', 1);
    events.pointerdown(pointer1Down);

    const pointer2Down = createPointerEvent('pointerdown', 2);
    events.pointerdown(pointer2Down);

    jest.advanceTimersByTime(350);

    const pointer2Up = createPointerEvent('pointerup', 2);
    events.pointerup(pointer2Up);

    const pointer1Up = createPointerEvent('pointerup', 1);
    events.pointerup(pointer1Up);

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockTarget.setPointerCapture).toBeCalledWith(1);
    expect(mockTarget.setPointerCapture).toBeCalledTimes(1);
  });

  it(`should not work when target don't support addEventListener method`, () => {
    Object.defineProperty(mockTarget, 'addEventListener', {
      get() {
        return false;
      },
    });

    setup(() => { }, mockTarget);
    expect(Object.keys(events)).toHaveLength(0);
  });
});
