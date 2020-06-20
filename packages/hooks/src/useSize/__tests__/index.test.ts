import { renderHook } from '@testing-library/react-hooks';
import useSize from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  it('should be defined', () => {
    expect(useSize).toBeDefined();
  });
  it('with argument', () => {
    const hook = renderHook(() => useSize(document.body));
    // with args, the init size should be the real size of the element, in node test env, it's 0 though
    expect(hook.result.current.width).toEqual(0);
    expect(hook.result.current.height).toEqual(0);
  });
});
