import { renderHook } from '@testing-library/react-hooks';
import useInViewport from '../index';

describe('useInViewport', () => {
  it('should be defined', () => {
    expect(useInViewport).toBeDefined();
  });

  it('with argument', () => {
    const hook = renderHook(() => useInViewport(document.body));
    expect(hook.result.current).toEqual(false);
  });
});
