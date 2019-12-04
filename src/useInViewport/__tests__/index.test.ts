import { renderHook } from '@testing-library/react-hooks';
import useInViewport from '../index';

describe('useInViewport', () => {
  it('should be defined', () => {
    expect(useInViewport).toBeDefined();
  });
  it('without argument ', () => {
    const hook = renderHook(() => useInViewport());
    expect(hook.result.current.length).toEqual(2);
    expect(hook.result.current[0]).toEqual(false);
    expect(hook.result.current[1].current).toEqual(undefined);
  });
  it('with argument', () => {
    const hook = renderHook(() => useInViewport<HTMLBodyElement>(document.body));
    expect(hook.result.current.length).toEqual(1);
    // expect(hook.result.current[0]).toEqual(true);
    expect(hook.result.current[0]).toEqual(false);
  });
});
