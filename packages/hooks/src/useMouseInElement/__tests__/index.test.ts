import { renderHook, waitFor } from '@testing-library/react';
import useMouseInElement, { type Result } from '../index';

describe('useMouseInElement', () => {
  function moveMouse(x: number, y: number) {
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: x,
        clientY: y,
      }),
    );
  }
  const targetEl = document.createElement('div');
  const getBoundingClientRectMock = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect');
  getBoundingClientRectMock.mockReturnValue({
    left: 100,
    top: 100,
    width: 200,
    height: 300,
  } as DOMRect);

  it('mouse in element', async () => {
    const inCb = jest.fn((result: Result) => result);
    const { result } = renderHook(() => useMouseInElement(() => targetEl, inCb));
    moveMouse(110, 110);
    await waitFor(() => expect(result.current.clientX).toBe(110));
    expect(result.current.clientY).toBe(110);
    expect(inCb).toBeCalled();
    expect(result.current.elementW).toBe(200);
    expect(result.current.elementH).toBe(300);
    expect(result.current.elementPosX).toBe(100);
    expect(result.current.elementPosY).toBe(100);
    expect(result.current.isInside).toBeTruthy();
  });

  it('mouse out element', async () => {
    const outCb = jest.fn((result: Result) => result);
    const { result } = renderHook(() => useMouseInElement(() => targetEl, undefined, outCb));
    moveMouse(80, 80);
    await waitFor(() => expect(result.current.clientX).toBe(80));
    expect(outCb).toBeCalled();
    expect(result.current.clientY).toBe(80);
    expect(result.current.elementW).toBe(200);
    expect(result.current.elementH).toBe(300);
    expect(result.current.elementPosX).toBe(100);
    expect(result.current.elementPosY).toBe(100);
    expect(result.current.isInside).toBeFalsy();
  });
});
