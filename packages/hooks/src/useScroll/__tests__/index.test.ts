import { renderHook } from '@testing-library/react-hooks';
import useScroll from '../index';

describe('useScroll', () => {
  it('should be defined', () => {
    expect(useScroll).toBeDefined();
  });
  it('document body', () => {
    const hook = renderHook(() => useScroll(document.body));
    expect(hook.result.current.left).toBe(0);
    expect(hook.result.current.top).toBe(0);
  });
  it('document', () => {
    const hook = renderHook(() => useScroll(document));
    expect(hook.result.current.left).toBe(0);
    expect(hook.result.current.top).toBe(0);
  });
});
