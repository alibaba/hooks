import { renderHook, act } from '@testing-library/react-hooks';
import useMouse from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  function moveMouse() {
    act(() => {
      document.dispatchEvent(new Event('mousemove'));
    });
  }

  it('should be defined', () => {
    expect(useMouse).toBeDefined();
  });
  it('on mouseMove', async () => {
    const hook = renderHook(() => useMouse());
    expect(hook.result.current.left).toEqual(0);
    expect(hook.result.current.top).toEqual(0);

    moveMouse();

    // can't manually set pageX & pageY for mouseEvent, default undefined here.
    expect(hook.result.current.left).toEqual(undefined);
    expect(hook.result.current.top).toEqual(undefined);

    hook.unmount();
  });
});
