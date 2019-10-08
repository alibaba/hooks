import { renderHook, act } from '@testing-library/react-hooks';
import useSize from '../index';

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSearch', () => {
  it('should be defined', () => {
    expect(useSize).toBeDefined();
  });
  it('initial value ', () => {
    const hook = renderHook(() => useSize());
    expect(hook.result.current[0].width).toEqual(0);
    expect(hook.result.current[0].height).toEqual(0);
    expect(hook.result.current[1].current).toEqual(null);
  });
});
