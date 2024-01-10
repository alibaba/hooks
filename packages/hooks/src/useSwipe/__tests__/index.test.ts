import { renderHook, waitFor } from '@testing-library/react';
import useSwipe from '../index';
import { useRef } from 'react';

describe('useSwipe', () => {
  function touchStart(x: number, y: number) {
    document.body.dispatchEvent(
      new TouchEvent('touchmove', {
        touches: [
          {
            clientX: x,
            clientY: y,
            pageX: x,
            pageY: y,
          } as any,
        ],
      }),
    );
  }

  it('should return init value', () => {
    const hook = renderHook(() => {
      const ref = useRef(document.body);

      return useSwipe(ref);
    });
    expect(hook.result.current).toStrictEqual({
      lengthX: 0,
      lengthY: 0,
      direction: null,
      isSwiping: false,
    });
  });

  it('touch move direction', async () => {
    const hook = renderHook(() => {
      const ref = useRef(document.body);

      return useSwipe(ref);
    });

    touchStart(-100, -50);
    await waitFor(() => expect(hook.result.current.lengthX).not.toEqual(0));
    expect(hook.result.current.direction).toBe('left');
  });
});
