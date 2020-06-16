import { renderHook, act } from '@testing-library/react-hooks';
import useSize from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  it('should be defined', () => {
    expect(useSize).toBeDefined();
  });
  it('without argument ', () => {
    const hook = renderHook(() => useSize());
    expect(hook.result.current.length).toEqual(2);
    // without args, the init width and height should be undefined
    expect(hook.result.current[0].width).toBeUndefined();
    expect(hook.result.current[0].height).toBeUndefined();
    expect(hook.result.current[1].current).toBeUndefined();
  });
  it('with argument', () => {
    const hook = renderHook(() => useSize<HTMLBodyElement>(document.body));
    expect(hook.result.current.length).toEqual(1);
    // with args, the init size should be the real size of the element, in node test env, it's 0 though
    expect(hook.result.current[0].width).toEqual(0);
    expect(hook.result.current[0].height).toEqual(0);
  });
});
