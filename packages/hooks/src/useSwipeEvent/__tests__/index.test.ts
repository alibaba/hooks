import { renderHook } from '@testing-library/react';
import useSwipeEvent from '../index';

describe('useSwipeEvent', () => {
  it('should work', () => {
    const onSwipeLeftMock = jest.fn();

    renderHook(() => {
      useSwipeEvent(document.body, {
        onSwipeLeft: onSwipeLeftMock,
      });
    });

    const touchStartEvent = new TouchEvent('touchstart', {
      touches: [
        {
          clientX: 100,
          clientY: 100,
          force: 0,
          identifier: 0,
          pageX: 0,
          pageY: 0,
          radiusX: 0,
          radiusY: 0,
          rotationAngle: 0,
          screenX: 0,
          screenY: 0,
          target: document.body,
        },
      ],
    });
    document.body.dispatchEvent(touchStartEvent);

    const touchEndEvent = new TouchEvent('touchend', {
      changedTouches: [
        {
          clientX: 50,
          clientY: 100,
          force: 0,
          identifier: 0,
          pageX: 0,
          pageY: 0,
          radiusX: 0,
          radiusY: 0,
          rotationAngle: 0,
          screenX: 0,
          screenY: 0,
          target: document.body,
        },
      ],
    });
    document.body.dispatchEvent(touchEndEvent);

    expect(onSwipeLeftMock).toHaveBeenCalled();
    expect(onSwipeLeftMock.mock.calls[0][0]).toBe(-50);
    expect(onSwipeLeftMock.mock.calls[0][1]).toBe(touchEndEvent);
  });
});
