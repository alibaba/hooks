import { renderHook, act } from '@testing-library/react-hooks';
import useTextSelection from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useTextSelection', () => {
  function moveMouse(x: number, y: number) {
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mousemove', {
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
        }),
      );
    });
  }

  function downMouse(x: number, y: number) {
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
        }),
      );
    });
  }

  function upMouse(x: number, y: number) {
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mouseup', {
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
        }),
      );
    });
  }

  function initGetSelection({ top = 0, left = 0, height = 0, width = 0, text = 'hello world!' }) {
    // TODO
    // @ts-ignore
    window.getSelection = () => {
      return {
        toString: () => {
          return text;
        },
        rangeCount: text.length,
        removeAllRanges: () => {},
        getRangeAt: (index: number) => {
          return {
            getBoundingClientRect: () => {
              return {
                top,
                left,
                bottom: top + height,
                right: left + width,
                height,
                width,
              };
            },
          };
        },
      };
    };
  }

  it('should be defined', () => {
    expect(useTextSelection).toBeDefined();
  });

  it('on textSelection', async () => {
    initGetSelection({ left: 10, top: 10, height: 100, width: 100, text: 'on textSelection' });

    // TODO
    // @ts-ignore
    const hook = renderHook(() => useTextSelection(() => document));

    expect(hook.result.current.text).toBe('');
    expect(hook.result.current.left).toBe(NaN);
    expect(hook.result.current.right).toBe(NaN);
    expect(hook.result.current.top).toBe(NaN);
    expect(hook.result.current.bottom).toBe(NaN);
    expect(hook.result.current.height).toBe(NaN);
    expect(hook.result.current.width).toBe(NaN);

    downMouse(0, 0);
    upMouse(100, 100);

    expect(hook.result.current.left).toBe(10);
    expect(hook.result.current.text).toBe('on textSelection');
    hook.unmount();
  });
});
