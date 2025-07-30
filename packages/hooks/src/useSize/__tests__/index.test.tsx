import { describe, expect, test, vi } from 'vitest';
import { useRef } from 'react';
import { renderHook, act, render, screen } from '@testing-library/react';
import useSize from '../index';

let callback;
vi.mock('resize-observer-polyfill', () => ({
  default: vi.fn().mockImplementation((cb) => {
    callback = cb;
    return {
      observe: () => {},
      disconnect: () => {},
    };
  }),
}));

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  test('should work when target is a mounted DOM', () => {
    const hook = renderHook(() => useSize(document.body));
    expect(hook.result.current).toEqual({ height: 0, width: 0 });
  });

  test('should work when target is a `MutableRefObject`', async () => {
    const mockRaf = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });

    function Setup() {
      const ref = useRef(null);
      const size = useSize(ref);

      return (
        <div ref={ref}>
          <div>width: {String(size?.width)}</div>
          <div>height: {String(size?.height)}</div>
        </div>
      );
    }

    render(<Setup />);
    expect(await screen.findByText(/^width/)).toHaveTextContent('width: undefined');
    expect(await screen.findByText(/^height/)).toHaveTextContent('height: undefined');

    act(() => callback([{ target: { clientWidth: 10, clientHeight: 10 } }]));
    expect(await screen.findByText(/^width/)).toHaveTextContent('width: 10');
    expect(await screen.findByText(/^height/)).toHaveTextContent('height: 10');
    mockRaf.mockRestore();
  });

  test('should not work when target is null', () => {
    expect(() => {
      renderHook(() => useSize(null));
    }).not.toThrowError();
  });

  test('should work', () => {
    const mockRaf = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 0;
      });
    const targetEl = document.createElement('div');
    const { result } = renderHook(() => useSize(targetEl));

    act(() => {
      callback([
        {
          target: {
            clientWidth: 100,
            clientHeight: 50,
          },
        },
      ]);
    });

    expect(result.current).toMatchObject({
      width: 100,
      height: 50,
    });

    mockRaf.mockRestore();
  });
});
