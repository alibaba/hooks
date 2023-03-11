import { renderHook, waitFor } from '@testing-library/react';
import useMouse from '../index';

describe('useMouse', () => {
  function moveMouse(x: number, y: number) {
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
      }),
    );
  }

  it('on mouseMove', async () => {
    const hook = renderHook(() => useMouse());
    expect(hook.result.current.pageX).toBeNaN();
    expect(hook.result.current.pageY).toBeNaN();

    moveMouse(10, 10);

    // can't manually set pageX & pageY for mouseEvent, default undefined here.
    await waitFor(() => expect(hook.result.current.pageX).toBeUndefined());
    expect(hook.result.current.pageY).toBeUndefined();
    expect(hook.result.current.clientX).toBe(10);
    expect(hook.result.current.clientY).toBe(10);
    expect(hook.result.current.screenX).toBe(10);
    expect(hook.result.current.screenY).toBe(10);
  });

  it('should be work with target', async () => {
    const events = {};
    const getBoundingClientRectMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
    jest.spyOn(document, 'addEventListener').mockImplementation(
      jest.fn((event: any, callback: any) => {
        events[event] = callback;
      }),
    );

    const targetEl = document.createElement('div');
    getBoundingClientRectMock.mockReturnValue({
      left: 100,
      top: 100,
      width: 200,
      height: 200,
    } as DOMRect);
    const { result } = renderHook(() => useMouse(targetEl));
    events['mousemove']({ pageX: 100, pageY: 100 });

    await waitFor(() => expect(result.current.elementX).toBe(0));
    expect(result.current.elementX).toBe(0);
    expect(result.current.elementY).toBe(0);
    expect(result.current.elementPosX).toBe(100);
    expect(result.current.elementPosY).toBe(100);
  });
});
