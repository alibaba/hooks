import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useTextSelection from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useTextSelection', () => {
  function downMouse(x: number, y: number, options?: MouseEventInit) {
    act(() => {
      document.dispatchEvent(
        new MouseEvent('mousedown', {
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
          ...options,
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

  test('on textSelection', async () => {
    initGetSelection({ left: 10, top: 10, height: 100, width: 100, text: 'on textSelection' });

    // TODO
    // @ts-ignore
    const hook = renderHook(() => useTextSelection(() => document));

    expect(hook.result.current.text).toBe('');
    expect(hook.result.current.left).toBeNaN();
    expect(hook.result.current.right).toBeNaN();
    expect(hook.result.current.top).toBeNaN();
    expect(hook.result.current.bottom).toBeNaN();
    expect(hook.result.current.height).toBeNaN();
    expect(hook.result.current.width).toBeNaN();

    downMouse(0, 0);
    upMouse(100, 100);

    expect(hook.result.current.left).toBe(10);
    expect(hook.result.current.text).toBe('on textSelection');
    hook.unmount();
  });

  test('keep/cancel the selected text range', async () => {
    initGetSelection({ text: 'aaa' });

    const hook = renderHook(() => useTextSelection(() => document));

    expect(hook.result.current.text).toBe('');
    downMouse(0, 0);
    upMouse(100, 100);
    expect(hook.result.current.text).toBe('aaa');

    // trigger the secondary button of mouse (usually the right button)
    downMouse(0, 0, { button: 2 });
    expect(hook.result.current.text).toBe('aaa');

    // // trigger the main button of mouse (usually the left button)
    downMouse(0, 0, { button: 0 });
    expect(hook.result.current.text).toBe('');

    hook.unmount();
  });
});
