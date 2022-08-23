import { renderHook } from '@testing-library/react-hooks';
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
    expect(hook.result.current.pageX).toEqual(NaN);
    expect(hook.result.current.pageY).toEqual(NaN);

    moveMouse(10, 10);
    await hook.waitForNextUpdate();

    // can't manually set pageX & pageY for mouseEvent, default undefined here.
    expect(hook.result.current.pageX).toEqual(undefined);
    expect(hook.result.current.pageY).toEqual(undefined);
    expect(hook.result.current.clientX).toEqual(10);
    expect(hook.result.current.clientY).toEqual(10);
    expect(hook.result.current.screenX).toEqual(10);
    expect(hook.result.current.screenY).toEqual(10);
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
    const { result, waitForNextUpdate } = renderHook(() => useMouse(targetEl));
    events['mousemove']({ pageX: 100, pageY: 100 });
    await waitForNextUpdate();

    expect(result.current.elementX).toBe(0);
    expect(result.current.elementY).toBe(0);
    expect(result.current.elementPosX).toBe(100);
    expect(result.current.elementPosY).toBe(100);
  });
});
